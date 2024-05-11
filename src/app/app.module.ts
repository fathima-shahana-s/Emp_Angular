import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { EmployeeDetailsComponent } from './components/employee-details/employee-details.component';
import { AddEmployeeComponent } from './components/add-employee/add-employee.component';
import { EmployeeEditComponent } from './components/employee-edit/employee-edit.component';
import { FormsModule } from '@angular/forms';
// import { HttpClientModule } from '@angular/common/http';
const routes: Routes = [
  { path: '', redirectTo: 'employee', pathMatch: 'full' },
  { path: 'employee', component: EmployeeListComponent },
  { path: 'employee/:id', component: EmployeeDetailsComponent },
  { path: 'add', component: AddEmployeeComponent },
  { path: 'employee/edit/:id', component: EmployeeEditComponent}
];

@NgModule({
  imports: [FormsModule, RouterModule.forRoot(routes)],
  providers: [],
  exports: []
})
export class AppModule{ }

