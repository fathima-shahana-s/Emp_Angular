import { Component,OnInit,Input } from '@angular/core';
import { Attendance } from 'src/app/models/attendance.model'; 
import { AttendanceService } from 'src/app/services/attendance.service';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AttendanceDataService } from 'src/app/services/attendancedata.service';

@Component({
  selector: 'app-attendance-edit',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './attendance-edit.component.html',
  styleUrls: ['./attendance-edit.component.css']
})
export class AttendanceEditComponent implements OnInit {
  
  attendance: Attendance = {};
  
    constructor(
    private route: ActivatedRoute,
    private router: Router,
    private attendanceService: AttendanceService,
    private attendancedataService: AttendanceDataService,
    private dialog: MatDialogRef<AttendanceEditComponent>
  ) { 
    //this.attendance = this.attendancedataService.attendance;
  }

  ngOnInit(): void {
    this.attendance = this.attendancedataService.attendance;
    console.log(this.attendance)
    this.attendanceService.get(this.attendance.attendance_id).subscribe((attendance: Attendance) => {
      this.attendance = attendance;
    });
    
  }
  ngOnChanges(): void {
    this.attendance = this.attendancedataService.attendance;
  }

  onSubmit(): void {
    this.attendanceService.update(this.attendance.attendance_id, this.attendance).subscribe(
      () => {
        console.log('Attendance updated successfully');
      },
      (error) => {
        console.error('Error updating attendance:', error);
      }
    );
  }

  onClose():void{
    this.dialog.close(false);
  }
}
