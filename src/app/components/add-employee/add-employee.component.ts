import { Component } from '@angular/core';
import { Employee } from '../../models/employee.model';
import { EmployeeService } from '../../services/employee.service';
import { FormsModule } from '@angular/forms';
import { EmployeeDataService } from 'src/app/services/employeedata.service';


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
    employee_id: undefined,
    name: '',
    other_details: '',
  };
  submitted = false;

  constructor(private employeeService: EmployeeService, private employeedataservice :EmployeeDataService) { }

  saveEmployee(): void {
    const data = {
      employee_id:this.employee.employee_id,
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
          this.employeedataservice.setEmployeeAdded(true);
        },
        error: (e: any) => console.error(e)
      });
  }
  closeForm(): void {
    this.submitted = false;

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
