import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Employee } from '../../models/employee.model';
import { EmployeeService } from '../../services/employee.service';
import { EmployeeDataService } from 'src/app/services/employeedata.service';

@Component({
  selector: 'app-employee-delete',
  templateUrl: './employee-delete.component.html',
  styleUrls: ['./employee-delete.component.css']
})
export class EmployeeDeleteComponent implements OnInit {
  employee: Employee={};
  submitted:boolean=false;

  constructor(
    public dialogRef: MatDialogRef<EmployeeDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { employee: Employee },
    private employeeService: EmployeeService,
    private employeeDataService:EmployeeDataService// Inject EmployeeService
  ) {

   }

  ngOnInit(): void {
    this.employee = this.employeeDataService.employee;
  }

  onDelete(): void {
    this.employeeService.delete(this.employee?.employee_id).subscribe(
      () => {
        console.log('Employee deleted:', this.employee);
        this.submitted = true;
        this.employeeDataService.setEmployeeAdded(true);
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
