import { Component } from '@angular/core';
import { Employee } from '../../models/employee.model';
import { EmployeeService } from '../../services/employee.service';
import { FormsModule } from '@angular/forms';

@Component({
  standalone:true,
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css'],
  imports:[FormsModule]
})
export class AddEmployeeComponent {

  employee: Employee = {
    dept: '',
    email: '',
    employee_id: -1,
    name: '',
    other_details: '',
  };
  submitted = false;

  constructor(private employeeService: EmployeeService) { }

  saveEmployee(): void {
    const data = {
      dept: this.employee.dept,
      email: this.employee.email,
      name: this.employee.name,
      other_details: this.employee.other_details,
    };

    this.employeeService.create(data)
      .subscribe({
        next: (res: any) => {
          console.log(res);
          this.submitted = true;
        },
        error: (e: any) => console.error(e)
      });
  }

  newEmployee(): void {
    this.submitted = false;
    this.employee = {
      dept: '',
      email: '',
      employee_id: -1,
      name: '',
      other_details: '',
    };
  }

}
