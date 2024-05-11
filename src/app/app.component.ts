import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet, HomeComponent, FormsModule, HttpClientModule
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
