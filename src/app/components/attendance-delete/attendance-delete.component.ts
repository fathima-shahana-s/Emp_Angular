import { Component,Inject,OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Attendance } from '../../models/attendance.model';
import { AttendanceService } from '../../services/attendance.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-attendance-delete',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './attendance-delete.component.html',
  styleUrl: './attendance-delete.component.css'
})
export class AttendanceDeleteComponent {
  attendance: Attendance = {attendance_id: 0, employee_id: 0, date: new Date(), status: '' };

  constructor(
    private attendanceService: AttendanceService,
    private route: ActivatedRoute,
    private router: Router) { }

    deleteAttendance(): void {
      const data={
      attendance_id:this.attendance.attendance_id,
      employee_id: this.attendance.employee_id,
      date: this.attendance.date,
      status: this.attendance.status,
      }

      this.attendanceService.delete(this.attendance.attendance_id)
        .subscribe({
          next: (res) => {
            console.log(res);
            this.router.navigate(['/attendance']);
          },
          error: (e) => console.error(e)
        });
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