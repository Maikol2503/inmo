import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LogginComponent } from "./loggin/loggin.component";
import { LoginComponent } from './login/login.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LogginComponent, LoginComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'inmofront';
}
