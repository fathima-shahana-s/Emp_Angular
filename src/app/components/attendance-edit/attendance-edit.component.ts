import { Component,OnInit,OnChanges,SimpleChanges } from '@angular/core';
import { Attendance } from 'src/app/models/attendance.model';
import { AttendanceService } from 'src/app/services/attendance.service';
import { FormBuilder,FormsModule,FormGroup,Validators,ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {  MatDialogRef } from '@angular/material/dialog';
import { AttendanceDataService } from 'src/app/services/attendancedata.service';

@Component({
  selector: 'app-attendance-edit',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './attendance-edit.component.html',
  styleUrls: ['./attendance-edit.component.css']
})
export class AttendanceEditComponent implements OnInit,OnChanges {

  attendance: Attendance = {};
  attendancedit: FormGroup;
  isEditing: boolean = false;

    constructor(
    private route: ActivatedRoute,
    private router: Router,
    private attendanceService: AttendanceService,
    private attendancedataService: AttendanceDataService,
    private dialog: MatDialogRef<AttendanceEditComponent>,
    private formBuilder: FormBuilder

  ) {
    this.attendance = this.attendancedataService.attendance;
    this.attendancedit = this.formBuilder.group({
      employee_id: ['', Validators.required],
      attendance_id: ['', Validators.required],
      date: ['', Validators.required],
      status: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.updateForm(this.attendance)
    // this.attendance = this.attendancedataService.attendance;
    // console.log(this.attendance)
    // this.attendanceService.get(this.attendance.attendance_id).subscribe((attendance: Attendance) => {
    //   this.attendance = attendance;
    // });

  }
  ngOnChanges(changes: SimpleChanges): void {
    if(changes['attendance']){
      this.updateForm(changes['attendance'].currentValue);
    // this.attendance = this.attendancedataService.attendance;
  }
}

private updateForm(attendance: Attendance): void {
  if (attendance) {
    this.attendancedit.patchValue({
      employee_id: attendance.employee_id,
      attendance_id: attendance.attendance_id,
      status: attendance.status,
      date: attendance.date
    });
  }
}

  onSubmit(): void {
    this.attendance = {employee_id:this.attendancedit.get('employee_id')!.value,attendance_id:this.attendancedit.get('attendance_id')!.value,date:this.attendancedit.get('date')!.value,status:this.attendancedit.get('status')!.value}
    this.attendanceService.update(this.attendance.attendance_id, this.attendance).subscribe(
      () => {
        console.log('Attendance edited successfully.')
        this.dialog.close();
        this.attendancedataService.setAttendanceAdded(true);
      },
      (error) => {
        console.error('Error updating attendance:', error);
      }
    );
  }

  onClose():void{
    this.dialog.close(false);
    this.attendancedit.reset();
    this.isEditing=false;
  }
}
