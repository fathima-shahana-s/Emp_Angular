import { Component } from '@angular/core';
import { ExportAttendanceComponent } from '../export-attendance/export-attendance.component';
import { AddEmployeeComponent } from '../add-employee/add-employee.component';
import { AddAttendanceComponent } from '../add-attendance/add-attendance.component';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ExportAttendanceComponent,AddEmployeeComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
