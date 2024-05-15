import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Employee } from '../models/employee.model';

@Injectable({ providedIn: 'root' })
export class EmployeeDataService {

  employee: Employee = {}

  private employeeAddedSource = new BehaviorSubject<boolean>(false);
  
  employeeAdded$ = this.employeeAddedSource.asObservable();

  setEmployeeAdded(added: boolean) {
    this.employeeAddedSource.next(added);
  }

  passEmployeeData(data: Employee) {
    this.employee = data;
  }

}
