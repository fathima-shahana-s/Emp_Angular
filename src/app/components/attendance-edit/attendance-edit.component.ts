import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { Attendance } from 'src/app/models/attendance.model';
import { AttendanceService } from 'src/app/services/attendance.service';
import { FormsModule } from '@angular/forms';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';

import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AttendanceDataService } from 'src/app/services/attendancedata.service';
import { Employee } from 'src/app/models/employee.model';
import { EmployeeService } from 'src/app/services/employee.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-attendance-edit',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,FormsModule],
  templateUrl: './attendance-edit.component.html',
  styleUrls: ['./attendance-edit.component.css'],
})
export class AttendanceEditComponent implements OnInit {
  attendance: Attendance = {};
  employees: Employee[] = [];
  attendanceedit: FormGroup;
  isEditing: boolean = false; // Flag to control form visibility
  submitted = false;

  constructor(
    private attendanceService: AttendanceService,
    private attendancedataService: AttendanceDataService,
    private dialog: MatDialogRef<AttendanceEditComponent>,
    private formBuilder: FormBuilder,
    private employeeService: EmployeeService
  ) {
    this.employeeService.getAll().subscribe((employees: Employee[]) => {
      this.employees = employees;
    });
    this.attendance = this.attendancedataService.attendance;
    this.attendanceedit = this.formBuilder.group({
      attendance_id: [this.attendance.attendance_id, Validators.required],
      employee_id: [this.attendance.employee_id, Validators.required],
      date: [this.attendance.date, Validators.required],
      status: [this.attendance.status, Validators.required],
    });
  }

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['attendance']) {
      this.updateForm(changes['attendance'].currentValue);
    }
  }

  private updateForm(attendance: Attendance): void {
    this.employeeService.getAll().subscribe((employees: Employee[]) => {
      this.employees = employees;
      this.attendanceedit.patchValue({
        attendance_id: attendance.attendance_id,
        employee_id: attendance.employee_id,
        date: attendance.date,
        status: attendance.status,
      });
      console.log(this.employees);
    });
  }
  onSubmit(): void {
    this.attendance = {
      attendance_id: this.attendanceedit.get('attendance_id')!.value,
      employee_id: this.attendanceedit.get('employee_id')!.value,
      date: this.attendanceedit.get('date')!.value,
      status: this.attendanceedit.get('status')!.value,
    };
    this.attendanceService
      .update(this.attendance.attendance_id, this.attendance)
      .subscribe(
        () => {
          console.log('Attendance updated successfully');
          this.dialog.close();
          this.submitted = true;
          this.attendancedataService.setAttendanceAdded(true);
        },
        (error) => {
          console.error('Error updating attendance:', error);
        }
      );
  }

  onClose(): void {
    this.dialog.close();
    this.attendanceedit.reset();
    this.isEditing = false;
  }
}
