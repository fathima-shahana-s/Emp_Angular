import { Component } from '@angular/core';
import { Attendance } from '../../models/attendance.model';
import { AttendanceService } from '../../services/attendance.service';
import { FormsModule } from '@angular/forms';
import { AttendanceDataService } from '../../services/attendancedata.service';

@Component({

  selector: 'app-add-attendance',
  standalone: true,
  imports:[FormsModule],
  templateUrl: './add-attendance.component.html',
  styleUrls: ['./add-attendance.component.css']
})
export class AddAttendanceComponent {

  attendance: Attendance = {
    employee_id:0,
    date: new Date("Fri Dec 08 2019 07:44:57"),
    status: "",
  };
  submitted = false;

  constructor(private attendanceService: AttendanceService,private attendanceDataService: AttendanceDataService) { }

  saveAttendance(): void {
    const data = {
      employee_id: this.attendance.employee_id,
      date: this.attendance.date,
      status: this.attendance.status,
    };

    this.attendanceService.create(data)
      .subscribe({
        next: (res: any) => {
          console.log(res);
          this.submitted = true;
          this.attendanceDataService.setAttendanceAdded(true);
        },
        error: (e: any) => console.error(e)
      });
  }

  closeForm(): void {
    this.submitted = false;
  }
  
  newAttendance(): void {
    this.submitted = false;
    this.attendance = {
      employee_id: 0,
      date: new Date("Fri Dec 08 2019 07:44:57"),
      status: "",
    };
  }

}
