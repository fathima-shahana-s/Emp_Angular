import { Component, OnInit } from '@angular/core';
import { Employee } from '../../models/employee.model';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  employee?: Employee[];
  currentEmployee: Employee = {};
  currentIndex = -1;
  title = '';

  constructor(private employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.retrieveEmployee();
  }

  retrieveEmployee(): void {
    this.employeeService.getAll()
      .subscribe({
        next: (data) => {
          this.employee = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  refreshList(): void {
    this.retrieveEmployee();
    this.currentEmployee = {};
    this.currentIndex = -1;
  }

  setActiveEmployee(employee: Employee, index: number): void {
    this.currentEmployee = employee;
    this.currentIndex = index;
  }

  removeAllEmployee(): void {
    this.employeeService.deleteAll()
      .subscribe({
        next: (res) => {
          console.log(res);
          this.refreshList();
        },
        error: (e) => console.error(e)
      });
  }

  searchTitle(): void {
    this.currentEmployee = {};
    this.currentIndex = -1;

    this.employeeService.findByTitle(this.title)
      .subscribe({
        next: (data) => {
          this.employee = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

}
