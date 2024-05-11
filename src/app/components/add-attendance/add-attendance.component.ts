import { Component } from '@angular/core';
import { Attendance } from '../../models/attendance.model';
import { AttendanceService } from '../../services/attendance.service';

@Component({
  selector: 'app-add-attendance',
  templateUrl: './add-attendance.component.html',
  styleUrls: ['./add-attendance.component.css']
})
export class AddAttendanceComponent {

  attendance: Attendance = {
    title: '',
    description: '',
    published: false
  };
  submitted = false;

  constructor(private attendanceService: AttendanceService) { }

  saveAttendance(): void {
    const data = {
      title: this.attendance.title,
      description: this.attendance.description
    };

    this.attendanceService.create(data)
      .subscribe({
        next: (res: any) => {
          console.log(res);
          this.submitted = true;
        },
        error: (e: any) => console.error(e)
      });
  }

  newAttendance(): void {
    this.submitted = false;
    this.attendance = {
      title: '',
      description: '',
      published: false
    };
  }

}
