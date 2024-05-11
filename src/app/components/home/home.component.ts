import { Component } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
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
  constructor(public dialog: MatDialog) { }

  openDialog(): void {
    this.dialog.open(ExportAttendanceComponent, {
      width: '250px', // You can adjust the width as per your requirement
    });

    /*dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });*/
  }
}
