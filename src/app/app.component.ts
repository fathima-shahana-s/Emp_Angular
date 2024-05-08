import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AddEmployeeComponent } from './components/add-employee/add-employee.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,HomeComponent,AddEmployeeComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: [
    './app.component.css',
    './components/home/home.component.css'
  ]
})
export class AppComponent {
  title = 'EmpAngular';
}
