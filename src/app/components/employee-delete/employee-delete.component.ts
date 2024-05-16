import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Employee } from '../../models/employee.model';
import { EmployeeService } from '../../services/employee.service';
import { MatDialog } from '@angular/material/dialog';
import { EmployeeDataService } from 'src/app/services/employeedata.service';

@Component({
  selector: 'app-employee-delete',
  standalone: true,
  templateUrl: './employee-delete.component.html',
  styleUrls: ['./employee-delete.component.css']
})
export class EmployeeDeleteComponent implements OnInit {
  employee: Employee = {};

  constructor(
    public dialogRef: MatDialogRef<EmployeeDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { employee: Employee },
    private employeedataService:EmployeeDataService,
    private employeeService: EmployeeService, // Inject EmployeeService
    private dialog :MatDialog
  ) {
    this.employee = {};
   }

   ngOnInit(): void {
      // Log complete data object
    if (this.employee && this.employeedataService.employee) {
      console.log("Employee data found:", this.employeedataService.employee);  // Log employee object if present
      this.employee = this.employeedataService.employee; // Access employee object from injected data
    } else {
      console.error('Error: No employee data provided.');
      // Optionally, close the dialog or handle the error in another way
      this.dialogRef.close(false);
    }
  }

  onDelete(): void {
    this.employeeService.delete(this.employee.employee_id).subscribe(
      () => {
        console.log('Employee deleted:', this.employee);
        this.dialogRef.close(true);
      },
      error => {
        console.error('Error deleting employee:', error);
        // Optionally handle error
      }
    );
  }

  onClose(): void {
    this.dialogRef.close(false);
  }
}