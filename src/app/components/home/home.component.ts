import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ExportAttendanceComponent } from '../export-attendance/export-attendance.component';
import { EditEmployeeComponent } from '../edit-employee/edit-employee.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(public dialog: MatDialog) { }

  openDialog(dialogType: string): void {
    if (dialogType === 'editEmployee') {
      this.dialog.open(EditEmployeeComponent, {
        width: '250px', // You can adjust the width as per your requirement
      });
    } else if (dialogType === 'exportAttendance') {
      this.dialog.open(ExportAttendanceComponent, {
        width: '250px', // You can adjust the width as per your requirement
      });
    }
  }
}
