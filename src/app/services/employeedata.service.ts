import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class EmployeeDataService {
  private employeeAddedSource = new BehaviorSubject<boolean>(false);
  employeeAdded$ = this.employeeAddedSource.asObservable();

  setEmployeeAdded(added: boolean) {
    this.employeeAddedSource.next(added);
  }
}