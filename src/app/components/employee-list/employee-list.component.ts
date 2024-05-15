import { Component, OnInit } from '@angular/core';
import { Employee } from '../../models/employee.model';
import { EmployeeService } from '../../services/employee.service';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { ExportAttendanceComponent } from '../export-attendance/export-attendance.component';
import { AddEmployeeComponent } from '../add-employee/add-employee.component';
import { AddAttendanceComponent } from '../add-attendance/add-attendance.component';
import { AttendanceEditComponent } from '../attendance-edit/attendance-edit.component';
import { AttendanceDeleteComponent } from '../attendance-delete/attendance-delete.component';
import { EmployeeDeleteComponent } from '../employee-delete/employee-delete.component';
import { EditEmployeeComponent } from '../edit-employee/edit-employee.component';
import { EmployeeDataService } from '../../services/employeedata.service';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports:[CommonModule],
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  employees: Employee[]=[];
  currentEmployee: Employee = {};
  currentIndex = -1;
  title = '';

  constructor(private employeeService: EmployeeService, private dialog :MatDialog,private employeeDataService: EmployeeDataService) { }

  ngOnInit(): void {
    this.retrieveEmployee();
    this.employeeDataService.employeeAdded$.subscribe((added) => {
      if (added) {
        console.log("added new emp")
        this.refreshList();
        this.employeeDataService.setEmployeeAdded(false); // Reset flag
      }
    });
  }
  ngOnChanges(): void {
    this.employeeDataService.employeeAdded$.subscribe((added) => {
      if (added) {
        this.refreshList();
        this.employeeDataService.setEmployeeAdded(false); // Reset flag
      }
    });
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.

  }
  
  updateemployee(emp: Employee): void {
    this.employeeDataService.passEmployeeData(emp);
  }


  retrieveEmployee(): void {
    this.employeeService.getAll()
      .subscribe({
        next: (data) => {
          this.employees = data;
        },
        error: (e) => console.error(e)
      });
  }

  refreshList(): void {
    this.retrieveEmployee();
    this.currentEmployee = {};
    this.currentIndex = -1;
  }

  setActiveEmployee(employee: Employee, index: number): void {
    this.currentEmployee = employee;
    this.currentIndex = index;
  }

  removeAllEmployee(): void {
    this.employeeService.deleteAll()
      .subscribe({
        next: (res) => {
          console.log(res);
          this.refreshList();
        },
        error: (e) => console.error(e)
      });
  }

  searchTitle(): void {
    this.currentEmployee = {};
    this.currentIndex = -1;

    this.employeeService.findByTitle(this.title)
      .subscribe({
        next: (data) => {
          this.employees = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
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
    else if (dialogType == 'attendanceDelete') {
      this.dialog.open(AttendanceDeleteComponent, {
        hasBackdrop: true,
      });
    }
    else if (dialogType == 'deleteEmployee') {
      this.dialog.open(EmployeeDeleteComponent, {
        hasBackdrop: true,
      });
    }
  }


}
