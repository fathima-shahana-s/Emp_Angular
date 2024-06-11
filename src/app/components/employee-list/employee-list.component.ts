import { Component, OnInit } from '@angular/core';
import { Employee } from '../../models/employee.model';
import { EmployeeService } from '../../services/employee.service';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { AddEmployeeComponent } from '../add-employee/add-employee.component';
import { EmployeeDeleteComponent } from '../employee-delete/employee-delete.component';
import { EditEmployeeComponent } from '../edit-employee/edit-employee.component';
import { EmployeeDataService } from 'src/app/services/employeedata.service';


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

  constructor(private employeeService: EmployeeService, private dialog :MatDialog,private employeedataService: EmployeeDataService,) { }

  ngOnInit(): void {
    this.retrieveEmployee();
    this.employeedataService.employeeAdded$.subscribe(
      (added) => {
        if (added) {
          this.refreshList();
          this.employeedataService.setEmployeeAdded(false); // Reset employeeAdded after update
        }
      }
    );
  }

  sendEmp(employee:Employee):void{
    this.employeedataService.passEmployeeData(employee);
  }

  retrieveEmployee(): void {
    this.employeeService.getAll()
      .subscribe({
        next: (data) => {
          this.employees = data;
          console.log(data);
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
    // } else if (dialogType === 'exportAttendance') {
      // this.dialog.open(ExportAttendanceComponent, {
      //   hasBackdrop: true,
      //   // You can adjust the width as per your requirement
      // });
    }
    else if (dialogType === 'addEmployee') {
      this.dialog.open(AddEmployeeComponent, {
        hasBackdrop: true,
        // You can adjust the width as per your requirement
      });
    }
    // else if (dialogType === 'addAttendance') {
    //   this.dialog.open(AddAttendanceComponent, {
    //     hasBackdrop: true,
    //     // You can adjust the width as per your requirement
    //   });
    // }
    // else if (dialogType === 'editAttendance') {
    //   this.dialog.open(AttendanceEditComponent, {
    //     hasBackdrop: true,
    //     // You can adjust the width as per your requirement
    //   });
    // }
    // else if (dialogType == 'attendanceDelete') {
    //   this.dialog.open(AttendanceDeleteComponent, {
    //     hasBackdrop: true,
    //   });
    // }
    else if (dialogType == 'deleteEmployee') {
      this.dialog.open(EmployeeDeleteComponent, {
        hasBackdrop: true,
      });
    }
  }


}
