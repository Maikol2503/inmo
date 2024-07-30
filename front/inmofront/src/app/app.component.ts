import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { NavComponent } from './nav/nav.component';
import { CommonModule } from '@angular/common';
import { LoginService } from './services/auth/login.service';
import { BarraSuperiorComponent } from './barra-superior/barra-superior.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,  LoginComponent, NavComponent, CommonModule, BarraSuperiorComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  
  constructor(private loginServe:LoginService){}


  userLoginOn:boolean = false
  title = 'inmofront';


  ngOnInit(): void {
      // Emitir el estado inicial de autenticación
      this.loginServe.currenUserLoginOn.next(this.loginServe.isAuthenticated())
      // Suscribirse a los cambios en el estado de autenticación
      this.loginServe.currenUserLoginOn.subscribe({
        next:(userLoginOn)=>{
          this.userLoginOn = userLoginOn
        }
      })
  }



  //   checkTokenExists(): boolean {
  //     const token = localStorage.getItem('token');
  //     if(token){
  //       return true
  //     } else{
  //       return false
  //     }

  // }
}