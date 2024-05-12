import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EmployeeListComponent } from '../employee-list/employee-list.component';
import { ExportAttendanceComponent } from '../export-attendance/export-attendance.component';
import { EditEmployeeComponent } from '../edit-employee/edit-employee.component';
import { AddEmployeeComponent } from '../add-employee/add-employee.component';
import { AddAttendanceComponent } from '../add-attendance/add-attendance.component';


@Component({
  standalone:true,
  selector: 'app-home',
  imports: [EmployeeListComponent,AddEmployeeComponent, AddAttendanceComponent, EditEmployeeComponent,ExportAttendanceComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})


export class HomeComponent {
  constructor(private dialog: MatDialog) { }

ngOnInit(): void {


}


  openDialog(dialogType: string): void {
    if (dialogType === 'editEmployee') {
      this.dialog.open(EditEmployeeComponent, {
        hasBackdrop: true,
      });
    } else if (dialogType === 'exportAttendance') {
      this.dialog.open(ExportAttendanceComponent, {
        hasBackdrop: true,
        // You can adjust the width as per your requirement
      });
    }
  }


}
