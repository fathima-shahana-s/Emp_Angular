import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Attendance } from '../models/attendance.model';

@Injectable({ providedIn: 'root' })
export class AttendanceDataService {

  attendance: Attendance = {}

  private attendanceAddedSource = new BehaviorSubject<boolean>(false);
  attendanceAdded$ = this.attendanceAddedSource.asObservable();

  setAttendanceAdded(added: boolean) {
    this.attendanceAddedSource.next(added);
  }
  passAttendanceData(data: Attendance) {
    this.attendance = data;
  }
}