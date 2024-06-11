
import { Component, OnInit } from '@angular/core';
import { Attendance } from '../../models/attendance.model';
import { AttendanceService } from '../../services/attendance.service';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ExportAttendanceComponent } from '../export-attendance/export-attendance.component';
import { AddAttendanceComponent } from '../add-attendance/add-attendance.component';
import { AttendanceEditComponent } from '../attendance-edit/attendance-edit.component';
import { AttendanceDeleteComponent } from '../attendance-delete/attendance-delete.component';
import { AttendanceDataService } from '../../services/attendancedata.service';
import { Employee } from 'src/app/models/employee.model';
import { EmployeeService } from 'src/app/services/employee.service';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { Exportatt } from 'src/app/models/exportatt';
@Component({
  selector: 'app-attendance-list',
  standalone: true,
  imports:[
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    FormsModule
  ],
  templateUrl: './attendance-list.component.html',
  styleUrls: ['./attendance-list.component.css']
})
export class AttendanceListComponent implements OnInit {

  attendances: Attendance[]=[];
  employees:Employee[]=[];
  currentAttendance: Attendance = {};
  currentIndex = -1;
  title = '';
  
  exportatt: Exportatt = {
    employee_id: 0,
    month: '',
  };

  constructor(
    private AttendanceService: AttendanceService, private dialog : MatDialog,
    private attendanceDataService: AttendanceDataService, private employeeService:EmployeeService) { }

  ngOnInit(): void {
    this.retrieveAttendance();
    this.attendanceDataService.attendanceAdded$.subscribe((added) => {
      if (added) {
        this.refreshList();
        this.attendanceDataService.setAttendanceAdded(false); // Reset flag
      }
    });
  }

  sendAtt(data:Attendance):void{
    this.attendanceDataService.passAttendanceData(data);
  }

  retrieveAttendance(): void {
    this.AttendanceService.getAll()
      .subscribe({
        next: (response: { status: number, result: Attendance[] }) => {
          if(response.status==200){
            this.attendances = response.result;
            this.retrieveEmployees();
          }
          else{
            console.error("Error: Data status is not 200");
          }
        },
        error: (e) => console.error(e)
      });
  }

  retrieveEmployees(): void {
    this.employeeService.getAll()
      .subscribe({
        next: (data) => {
          this.employees = data;
          this.mergeAttendanceWithEmployee();
        },
        error: (e) => console.error(e)
      });
  }

  mergeAttendanceWithEmployee(): void {
    this.attendances = this.attendances.map(attendance => {
      const employee = this.employees.find(emp => emp.employee_id === attendance.employee_id);
      return {
        ...attendance,
        employeeName: employee ? employee.name : 'Unknown'
      };
    });
  }

  refreshList(): void {
    this.retrieveAttendance();
    this.currentAttendance = {};
    this.currentIndex = -1;
  }

  setActiveAttendance(attendance: Attendance, index: number): void {
    this.currentAttendance = attendance;
    this.currentIndex = index;
  }

  removeAllAttendance(): void {
    this.AttendanceService.deleteAll()
      .subscribe({
        next: (res) => {
          console.log(res);
          this.refreshList();
        },
        error: (e) => console.error(e)
      });
  }

  searchTitle(): void {
    this.currentAttendance = {};
    this.currentIndex = -1;

    this.AttendanceService.findByTitle(this.title)
      .subscribe({
        next: (data) => {
          this.attendances = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  openDialog(dialogType: string): void {
    // if (dialogType === 'editEmployee') {
    //   this.dialog.open(EditEmployeeComponent, {
    //     hasBackdrop: true,
    //   });
     if (dialogType === 'exportAttendance') {
      this.dialog.open(ExportAttendanceComponent, {
        hasBackdrop: true,
        // You can adjust the width as per your requirement
      });
    }
    // else if (dialogType === 'addEmployee') {
    //   this.dialog.open(AddEmployeeComponent, {
    //     hasBackdrop: true,
    //     // You can adjust the width as per your requirement
    //   });
    // }
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
    else if (dialogType == 'attendanceDelete') {
      this.dialog.open(AttendanceDeleteComponent, {
        hasBackdrop: true,
      });
    }
  }
    // else if (dialogType == 'deleteEmployee') {
    //   this.dialog.open(EmployeeDeleteComponent, {
    //     hasBackdrop: true,
    //   });
    // }
    
    
  
    
    
  }
  



