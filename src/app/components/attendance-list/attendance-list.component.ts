import { Component, OnInit } from '@angular/core';
import { Attendance } from '../../models/attendance.model';
import { AttendanceService } from '../../services/attendance.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-attendance-list',
  standalone: true,
  imports:[CommonModule],
  templateUrl: './attendance-list.component.html',
  styleUrls: ['./attendance-list.component.css']
})
export class AttendanceListComponent implements OnInit {

  employees: Attendance[]=[];
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
          this.employees = data;
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
          this.employees = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

}