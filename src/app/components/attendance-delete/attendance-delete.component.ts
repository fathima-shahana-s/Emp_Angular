import { Component, Inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Attendance } from '../../models/attendance.model';
import { AttendanceService } from '../../services/attendance.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AttendanceDataService } from 'src/app/services/attendancedata.service';

@Component({
  selector: 'app-attendance-delete',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './attendance-delete.component.html',
  styleUrl: './attendance-delete.component.css'
})
export class AttendanceDeleteComponent {
  attendance: Attendance = {};
  submitted: boolean = false;
  constructor(
    public dialogRef: MatDialogRef<AttendanceDeleteComponent>,
    private attendanceService: AttendanceService,
    private attendanceDataService: AttendanceDataService,
  ) {
    this.attendance = attendanceDataService.attendance;
  }
  ngOnInit(): void {
    this.attendance = this.attendanceDataService.attendance;

    console.log(this.attendance)

  }
  deleteAttendance(): void {
    this.attendanceService.delete(this.attendance.attendance_id??0)
      .subscribe({
        next: (res) => {
          this.submitted = true;
          this.attendanceDataService.setAttendanceAdded(true);
        },
        error: (e) => console.error(e)
      });
  }
  onClose(): void {
    this.dialogRef.close(false);
  }

}

/*
attendance:Attendance;

  constructor(
    public dialogRef: MatDialogRef<AttendanceDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { attendance: Attendance }
  ) {
    this.attendance = {};
   }

  ngOnInit(): void {
    this.attendance = this.data.attendance; // Access employee object from injected data
  }

  onDelete(): void {
    console.log('Attendance deleted:', this.attendance);
    this.dialogRef.close(true);
  }

  onClose(): void {
    this.dialogRef.close(false);
  }
  */
