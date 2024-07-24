import { Injectable } from '@angular/core';
import { LoginRequest } from './loginRequest';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject, catchError, map, Observable, tap, throwError } from 'rxjs';
import { User } from './user';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient, private router:Router) { }
  
  currenUserLoginOn:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  currenUserToken:BehaviorSubject<User> = new BehaviorSubject<User>({id:0, email:''})

 
  private url = 'http://127.0.0.1:8000'; // Ajusta la ruta según la ubicación del archivo
  email: string = '';
  token_key = 'token'

  login(credenciales:LoginRequest):Observable<any>{
    const body = new HttpParams()
      .set('username', credenciales.email)
      .set('password', credenciales.password);
  
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });
  
    return this.http.post<any>(`${this.url}/token`, body.toString(), { headers }).pipe(
      tap(response =>{
        if (response.access_token){
          console.log(response.access_token)
          this.setToken(response.access_token)
        }
      })
    )
  }


  private setToken(token:string){
    localStorage.setItem(this.token_key, JSON.stringify(token));
  }


  private getToken(): string | null{
    return localStorage.getItem(this.token_key)
  }


  isAuthenticated():boolean{
    const token = this.getToken()
    if(!token){
      return false
    }
    const paylod = JSON.parse(atob(token.split(".")[1]))
    const exp = paylod.exp * 1000
    return Date.now() < exp;
  }


  logout():void{
    localStorage.removeItem(this.token_key)
    this.router.navigate(["/login"])
  }









  getUserData(): Observable<any> {
    const token = localStorage.getItem('token');
    if (token) {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });
      return this.http.get(`${this.url}/users/me`, { headers });
    }
    return new Observable(observer => {
      observer.error('No token found');
    });
  }




















  // loginPrueba(credenciales: LoginRequest) {
  //   const body = new HttpParams()
  //     .set('username', credenciales.email)  // Asegúrate de usar los valores de credenciales
  //     .set('password', credenciales.password);
  
  //   const headers = new HttpHeaders({
  //     'Content-Type': 'application/x-www-form-urlencoded'
  //   });
  
  //   return this.http.post<any>(`${this.dataUrlPrueba}/token`, body.toString(), { headers })
  //     .pipe(map(token => {
  //       console.log(token);
  //       // login exitoso si hay un token jwt en la respuesta
  //       if (token && token.access_token) {
  //         // almacenar detalles del usuario y token jwt en el almacenamiento local para mantener al usuario conectado entre recargas de página
  //         localStorage.setItem('token', JSON.stringify(token));
  //         this.currenUserToken.next(token);
  //         this.currenUserLoginOn.next(true)
  //       }
  //       return token;
  //     }));
  // }


  

  // login(credenciales:LoginRequest):Observable<User>{

  //   return this.http.get<User>(this.dataUrl).pipe(

  //     tap((userData:User)=>{
  //       this.currenUserToken.next(userData);
  //       this.currenUserLoginOn.next(true)
  //     }),
       
  //     catchError(this.handleError)
  //   )
    
  // }


  

  // private handleError (error:HttpErrorResponse){
  //   if(error.status === 0){
  //     console.error("Se a producido un error",error.error)
  //   } else{
  //     console.error("Se retorno el codigo de error", error.status, error.error)
  //   }

  //   return throwError(()=> new Error('Algo falló, por favor intente nuevamente'))
  // }





   get userData():Observable<User>{
      return this.currenUserToken.asObservable();
   }

   get userLoginOn():Observable<boolean>{
      return this.currenUserLoginOn.asObservable();
   }



}
