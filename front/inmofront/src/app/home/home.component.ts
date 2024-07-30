import { afterNextRender, AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { User } from '../services/auth/user';
import { LoginService } from '../services/auth/login.service';
import { CommonModule } from '@angular/common';
import { NavComponent } from '../nav/nav.component';
import { NavmobileComponent } from '../navmobile/navmobile.component';
import { FormularioPublicarPropiedadComponent } from "../formulario-publicar-propiedad/formulario-publicar-propiedad.component";
import { RouterModule, Routes } from '@angular/router';
import { BarraSuperiorComponent } from '../barra-superior/barra-superior.component';


@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [CommonModule, NavComponent, NavmobileComponent, FormularioPublicarPropiedadComponent, RouterModule, BarraSuperiorComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class InicioComponent implements OnInit{

  userLoginOn:boolean = false
  userData?:User
  constructor(private loginServe:LoginService, private cdr: ChangeDetectorRef){}

  // ngAfterViewInit(): void {
  //   this.loginServe.currenUserLoginOn.next(true)
  //   this.cdr.detectChanges();
  // }


  ngOnInit(): void {
    
    this.loginServe.getUserData().subscribe({
      next:(data)=>{
        console.log(data)
      }
    });
  }


  logout(){
      this.loginServe.logout()
      this.loginServe.currenUserLoginOn.next(false)
  }



   // ngOnDestroy(): void {
  //  this.loginServe.currenUserData.unsubscribe()
  //  this.loginServe.currenUserLoginOn.unsubscribe()
  // }
}
