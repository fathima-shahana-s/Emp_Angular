import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from './../../services/employee.service';
import { Employee } from './../../models/employee.model';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-employee-edit',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './employee-edit.component.html',
  styleUrls: ['./employee-edit.component.css']
})
export class EmployeeEditComponent implements OnInit {
  employee: Employee = {employee_id: 0, name: '', email: '', dept: '', other_details: '' };
  

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private employeeService: EmployeeService
  ) { }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('employee_id');
    const id = idParam ? +idParam : 0; // Convert to number or use a default value if null
    this.employeeService.get(id).subscribe((employee: Employee) => {
      this.employee = employee;
    });
    
  }
  

  onSubmit(): void {
    this.employeeService.update(this.employee.employee_id, this.employee).subscribe(
      () => {
        console.log('Employee updated successfully');
      },
      (error) => {
        console.error('Error updating employee:', error);
      }
    );
    
    {
      this.router.navigate(['/employees']);
    };
  }
}



