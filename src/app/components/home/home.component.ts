import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EmployeeListComponent } from '../employee-list/employee-list.component';
import { AddEmployeeComponent } from '../add-employee/add-employee.component';
import { ExportAttendanceComponent } from '../export-attendance/export-attendance.component';
import { EditEmployeeComponent } from '../edit-employee/edit-employee.component';
import { AttendanceListComponent } from '../attendance-list/attendance-list.component';
import { AddAttendanceComponent } from '../add-attendance/add-attendance.component';
import { AttendanceEditComponent } from '../attendance-edit/attendance-edit.component';
import { AttendanceDeleteComponent } from '../attendance-delete/attendance-delete.component';


@Component({
  standalone:true,
  selector: 'app-home',
  imports: [EmployeeListComponent,AddEmployeeComponent, AddAttendanceComponent, EditEmployeeComponent,ExportAttendanceComponent,AttendanceDeleteComponent,AttendanceListComponent,AttendanceEditComponent],
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
    else if (dialogType === 'addEmployee') {
      this.dialog.open(AddEmployeeComponent, {
        hasBackdrop: true,
        // You can adjust the width as per your requirement
      });
    }
    else if (dialogType === 'addAttendance') {
      this.dialog.open(AddAttendanceComponent, {
        hasBackdrop: true,
        // You can adjust the width as per your requirement
      });
    }
    else if (dialogType === 'editAttendance') {
      this.dialog.open(AttendanceEditComponent, {
        hasBackdrop: true,
        // You can adjust the width as per your requirement
      });
    }
  }


}