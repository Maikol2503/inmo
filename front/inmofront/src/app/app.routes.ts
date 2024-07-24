import { Routes } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './core/guards/auth.guard';
import { AuthenticatedGuard } from './core/guards/authenticated.guard';

export const routes: Routes = [
    {path:'login', component:LoginComponent,  canActivate:[AuthenticatedGuard]},
    {path:'inicio', component:InicioComponent, canActivate:[AuthGuard]},
    { path: '', redirectTo: 'login', pathMatch: 'full' }, // Redirigir la ruta raíz a 'login'
    { path: '**', redirectTo: 'login' } // Manejar rutas no encontradas
 
];
