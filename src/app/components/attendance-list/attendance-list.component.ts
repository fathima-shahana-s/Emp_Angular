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

  attendance!: Attendance[];
  currentAttendance: Attendance = {};
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
          this.attendance = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  refreshList(): void {
    this.retrieveAttendance();
    this.currentAttendance = {};
    this.currentIndex = -1;
  }

  setActiveAttendance(attendance: Attendance, index: number): void {
    this.currentAttendance = attendance;
    this.currentIndex = index;
  }

  removeAllAttendance(): void {
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
    this.currentAttendance = {};
    this.currentIndex = -1;

    this.AttendanceService.findByTitle(this.title)
      .subscribe({
        next: (data) => {
          this.attendance = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

}