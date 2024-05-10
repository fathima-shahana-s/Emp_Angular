import { Component } from '@angular/core';
import { Employee } from '.../models/employee.model';
import { EmployeeService } from '.../services/employee.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent {

  employee: Employee = {
    title: '',
    description: '',
    published: false
  };
  submitted = false;

  constructor(private employeeService: EmployeeService) { }

  saveEmployee(): void {
    const data = {
      title: this.employee.title,
      description: this.employee.description
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
      title: '',
      description: '',
      published: false
    };
  }

}
