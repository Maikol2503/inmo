import { Component, OnDestroy, OnInit } from '@angular/core';
import { User } from '../services/auth/user';
import { LoginService } from '../services/auth/login.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent implements OnInit, OnDestroy {

  userLoginOn:boolean = false
  userData?:User
  constructor(private loginServe:LoginService){}

  ngOnDestroy(): void {
   this.loginServe.currenUserToken.unsubscribe()
   this.loginServe.currenUserLoginOn.unsubscribe()
  }

  ngOnInit(): void {

    this.loginServe.currenUserLoginOn.subscribe({
      next:(userLoginOn)=>{
        this.userLoginOn = userLoginOn
        console.log(this.userLoginOn)
      }
    })


    this.loginServe.currenUserToken.subscribe({
      next:(userData)=>{
        this.userData = userData
        console.log(this.userData)
      }
    })


    
    // saco los datos del usuario
    // this.loginServe.getUserData().subscribe(
    //   data => {
    //     this.userData = data;
    //     console.log(this.userData)
    //   },
    //   error => {
    //     console.error('Error fetching user data:', error);
    //   }
    // );
    
  }

  logout(){
      this.loginServe.logout()
  }


}
