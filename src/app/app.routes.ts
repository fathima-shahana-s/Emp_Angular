import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { AttendanceListComponent } from './components/attendance-list/attendance-list.component';
export const routes: Routes = [{ path: '', component: HomeComponent },
    { path: 'employees', component: EmployeeListComponent },
    { path: 'attendance', component: AttendanceListComponent }];
