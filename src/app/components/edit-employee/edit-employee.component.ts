import { Component } from '@angular/core';
import { Employee } from '../../models/employee.model';
import { EmployeeService } from '../../services/employee.service'; 
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-employee',
  standalone: true,
  imports:[FormsModule],
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css']
})
export class EditEmployeeComponent {
  employee: Employee;
  submitted = false;

  constructor(private employeeService: EmployeeService, private employeeData: Employee) {
    this.employee = employeeData;
  }

  saveEmployee(): void {
    const data = {
      dept: this.employee.dept,
      email: this.employee.email,
      name: this.employee.name,
      other_details: this.employee.other_details,
    };

    this.employeeService.update(this.employee.employee_id, data)
      .subscribe({
        next: (res: any) => {
          console.log(res);
          this.submitted = true;
        },
        error: (e: any) => console.error(e)
      });
  }

  resetForm(): void {
    this.submitted = false;
  }
}
