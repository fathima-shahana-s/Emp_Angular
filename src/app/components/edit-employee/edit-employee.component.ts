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
  isEditing: boolean = false; // Flag to control form visibility

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
      employee_id: ['', Validators.required],
      dept: ['', Validators.required],
      other_details: ['', Validators.required],
      name: ['', Validators.required],
      email: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    //this.employee = this.employeedataService.employee;
   //console.log(this.employee)
    //this.employeeService.get(this.employee.employee_id).subscribe((employee: Employee) => {
      //this.employee = employee;
    //});
    const employeeIdFromRoute = this.activatedRoute.snapshot.paramMap.get('id'); // Get employee ID from route parameter
    if (employeeIdFromRoute) {
      this.fetchEmployee(parseInt(employeeIdFromRoute)); // Fetch data based on ID
    }

  }
  //ngOnChanges(): void {
    //this.employee = this.employeedataService.employee;
    //if (this.employee) {
      //this.employeedit.patchValue(this.employee);
    //}
  //}

  fetchEmployee(employeeId: number): void {
    this.employeeService.get(employeeId).subscribe((employee: Employee) => {
      this.employee = employee;
      this.employeedit.patchValue(employee);
      this.isEditing = true; // Show form after data is fetched
    });
  }

  openEditForm(): void {
    // 1. Get the employee ID from user input
    let employeeId: number | null = null; // Initialize to null
    const userInputId = (document.getElementById('employeeIdInput') as HTMLInputElement)?.value;
 // Replace with your ID element selector
    if (userInputId) {
      employeeId = parseInt(userInputId);
    }
  
    // 2. Validate and handle missing ID
    
    if (!employeeId) {
      console.error('Please enter a valid Employee ID.');
      return; // Prevent further execution if ID is missing
    }
  
    // 3. If valid ID, proceed with fetching data
    this.fetchEmployee(employeeId);
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

   onClose(): void {
    this.employeedit.reset();
    this.isEditing = false;
  }

}
