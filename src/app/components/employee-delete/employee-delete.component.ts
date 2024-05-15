import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Employee } from '../../models/employee.model';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-employee-delete',
  templateUrl: './employee-delete.component.html',
  styleUrls: ['./employee-delete.component.css']
})
export class EmployeeDeleteComponent implements OnInit {
  employee: Employee;

  constructor(
    public dialogRef: MatDialogRef<EmployeeDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { employee: Employee },
    private employeeService: EmployeeService // Inject EmployeeService
  ) {
    this.employee = {};
   }

  ngOnInit(): void {
    this.employee = this.data.employee; // Access employee object from injected data
    if (this.data && this.data.employee) {
      this.employee = this.data.employee; // Access employee object from injected data
    } else {
      // Handle the case when data or employee is null
      console.error('Error: No employee data provided.');
      // Optionally, close the dialog or handle the error in another way
      this.dialogRef.close(false);
    }
  }

  onDelete(): void {
    this.employeeService.delete(this.employee?.employee_id).subscribe(
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
