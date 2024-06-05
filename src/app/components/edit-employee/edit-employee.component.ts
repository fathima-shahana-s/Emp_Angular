import { Component,OnInit,Input } from '@angular/core';
import { Employee } from '../../models/employee.model';
import { EmployeeService } from '../../services/employee.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { EmployeeDataService } from 'src/app/services/employeedata.service';

@Component({
  selector: 'app-edit-employee',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css']
})
export class EditEmployeeComponent implements OnInit{
  employeedit: FormGroup;

  employee: Employee = {};

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private employeeService: EmployeeService,
    private employeedataService:EmployeeDataService,
    private dialog :MatDialogRef<EditEmployeeComponent>,
    private formBuilder: FormBuilder
  ) {
    this.employee = this.employeedataService.employee;
    this.employeedit = this.formBuilder.group({
      employee_id: [this.employee.employee_id, Validators.required],
      dept: [this.employee.dept, Validators.required],
      other_details: [this.employee.other_details, Validators.required],
      name: [this.employee.name, Validators.required],
      email: [this.employee.email, Validators.required]
    });
  }

  ngOnInit(): void {
    //this.employee = this.employeedataService.employee;
    console.log(this.employee)
    this.employeeService.get(this.employee.employee_id).subscribe((employee: Employee) => {
      this.employee = employee;
    });

  }
  ngOnChanges(): void {
    this.employee = this.employeedataService.employee;
  }

  onSubmit(): void {
    this.employeeService.update(this.employee.employee_id, this.employee).subscribe(
      () => {
        console.log('Employee updated successfully');
        this.employeedataService.setEmployeeAdded(true);
      },
      (error) => {
        console.error('Error updating employee:', error);
      }
    );

  }

  onClose():void{
    this.employeedit.reset();
    this.employeedataService.employee = null;; // Clear employee data from service
    this.dialog.close(false);
  }

}
