import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Attendance } from '../../models/attendance.model';
import { AttendanceService } from '../../services/attendance.service';
import { AttendanceDataService } from 'src/app/services/attendancedata.service';

@Component({
  selector: 'app-attendance-delete',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './attendance-delete.component.html',
  styleUrl: './attendance-delete.component.css'
})

export class AttendanceDeleteComponent implements OnInit{
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
        next: () => {
          this.submitted = true;
          this.attendanceDataService.setAttendanceAdded(true);
          this.dialogRef.close(true);
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
