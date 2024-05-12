import { Component, OnInit } from '@angular/core';
import { Attendance } from '../../models/attendance.model';
import { AttendanceService } from '../../services/attendance.service';

@Component({
  selector: 'app-attendance-list',
  standalone: true,
  templateUrl: './attendance-list.component.html',
  styleUrls: ['./attendance-list.component.css']
})
export class AttendanceListComponent implements OnInit {

  employee!: Attendance[];
  currentEmployee: Attendance = {};
  currentIndex = -1;
  title = '';

  constructor(private AttendanceService: AttendanceService) { }

  ngOnInit(): void {
    this.retrieveAttendance();
  }

  retrieveAttendance(): void {
    this.AttendanceService.getAll()
      .subscribe({
        next: (data) => {
          this.employee = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  refreshList(): void {
    this.retrieveAttendance();
    this.currentEmployee = {};
    this.currentIndex = -1;
  }

  setActiveEmployee(employee: Attendance, index: number): void {
    this.currentEmployee = employee;
    this.currentIndex = index;
  }

  removeAllEmployee(): void {
    this.AttendanceService.deleteAll()
      .subscribe({
        next: (res) => {
          console.log(res);
          this.refreshList();
        },
        error: (e) => console.error(e)
      });
  }

  searchTitle(): void {
    this.currentEmployee = {};
    this.currentIndex = -1;

    this.AttendanceService.findByTitle(this.title)
      .subscribe({
        next: (data) => {
          this.employee = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

}
