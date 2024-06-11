import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AttendanceService } from '../../services/attendance.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { Exportatt } from '../../models/exportatt';
import { saveAs } from 'file-saver-es';
import { Employee } from 'src/app/models/employee.model';
import { CommonModule } from '@angular/common';
import { AttendanceDataService } from 'src/app/services/attendancedata.service';

@Component({
  selector: 'app-export-attendance',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './export-attendance.component.html',
  styleUrl: './export-attendance.component.css'
})
export class ExportAttendanceComponent implements OnInit {

  employees:Employee[]=[];
  submitted = false;

  exportatt:Exportatt={
    employee_id:0,
    month:'',
  };

  constructor(
    public dialogRef: MatDialogRef<ExportAttendanceComponent>,
    private attendanceService: AttendanceService,
    private attendanceDataService: AttendanceDataService,
    private employeeService: EmployeeService,
  ) { }

  ngOnInit(): void {
    this.employeeService.getAll()
    .subscribe({
      next: (data) => {
        this.employees = data;
        console.log('Employee data',data);
      },
      error: (e) => console.error(e)
    }); // Load employees on component initialization
  }


  exportcsv(): void{

    this.attendanceService.getAttendance(this.exportatt.employee_id ?? 0,this.exportatt.month ?? '').subscribe({
      next:(res:Blob)=>{
        saveAs(res, 'data' + '.csv');
      },
      error: (e: Error) => console.error(e)
    });
  }

  onClose(): void {
    this.dialogRef.close(false);
  }

}
