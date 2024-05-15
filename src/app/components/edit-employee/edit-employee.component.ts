import { Component,OnInit,Input } from '@angular/core';
import { Employee } from '../../models/employee.model';
import { EmployeeService } from '../../services/employee.service';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-employee',
  standalone: true,
  imports:[FormsModule],
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css']
})
export class EditEmployeeComponent implements OnInit{
  
  employee: Employee = {employee_id:0, dept:'', other_details: '',name:'',email:'' };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private employeeService: EmployeeService,
    private dialog :MatDialog
  ) { }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('employee_id'); //
    const id = idParam ? + idParam : 0; // Convert to number or use a default value if null
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
      this.router.navigate(['/employee']);
    };
  }





}
