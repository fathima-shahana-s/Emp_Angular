import { Component,OnInit,Input, SimpleChanges } from '@angular/core';
import { Attendance } from 'src/app/models/attendance.model';
import { AttendanceService } from 'src/app/services/attendance.service';
//import { FormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators,ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AttendanceDataService } from 'src/app/services/attendancedata.service';
import { Employee } from 'src/app/models/employee.model';
import { EmployeeService } from 'src/app/services/employee.service';


@Component({
  selector: 'app-attendance-edit',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './attendance-edit.component.html',
  styleUrls: ['./attendance-edit.component.css']
})
export class AttendanceEditComponent implements OnInit {

  attendance: Attendance = {};
  employees:Employee[]=[];
  attendanceedit: FormGroup;
  isEditing: boolean = false; // Flag to control form visibility
  submitted =false

    constructor(
    //private route: ActivatedRoute,
    //private router: Router,
    private attendanceService: AttendanceService,
    private attendancedataService: AttendanceDataService,
    private dialog: MatDialogRef<AttendanceEditComponent>,
    private formBuilder: FormBuilder,
    private employeeService:EmployeeService
  ) {
    this.attendance = this.attendancedataService.attendance;
    this.attendanceedit = this.formBuilder.group({
      attendance_id: ['', Validators.required],
      //name: ['', Validators.required],
      date: ['', Validators.required],
      status: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    //this.attendance = this.attendancedataService.attendance;
    //console.log(this.attendance)
    //this.attendanceService.get(this.attendance.attendance_id).subscribe((attendance: Attendance) => {
      //this.attendance = attendance;
    //});
    this.updateForm(this.attendance);

  }
  ngOnChanges(changes: SimpleChanges): void {
    //this.attendance = this.attendancedataService.attendance;
    if(changes['attendance']){
      this.updateForm(changes['attendance'].currentValue);
    }
  }
  private updateForm(attendance: Attendance): void {
    if (attendance) {
      // Fetch employee data based on attendance.employee_id (assuming foreign key)
      this.attendancedataService.getEmployee(attendance.employee_id).subscribe(
        (employee: Employee) => {
          // Update the form with employee name after fetching
      this.attendanceedit.patchValue({
        attendance_id: attendance.attendance_id,
        name: employee.name,
        date: attendance.date,
        status:attendance.status
      });
    }
  )
  }
}
  onSubmit(): void {
    this.attendance = {attendance_id:this.attendanceedit.get('attendance_id')!.value,name:this.attendanceedit.get('name')!.value,date:this.attendanceedit.get('date')!.value,status:this.attendanceedit.get('status')!.value}
    this.attendanceService.update(this.attendance.attendance_id, this.attendance).subscribe(
      () => {
        console.log('Attendance updated successfully');
        this.dialog.close();
        this.submitted = true;
        this.attendancedataService.setAttendanceAdded(true);
      },
      (error) => {
        console.error('Error updating attendance:', error);
      }
    );
  }

  onClose():void{
    this.dialog.close()
    this.attendanceedit.reset();
    this.isEditing = false;
  }
}
