import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AttendanceDataService {
  private attendanceAddedSource = new BehaviorSubject<boolean>(false);
  attendanceAdded$ = this.attendanceAddedSource.asObservable();

  setAttendanceAdded(added: boolean) {
    this.attendanceAddedSource.next(added);
  }
}