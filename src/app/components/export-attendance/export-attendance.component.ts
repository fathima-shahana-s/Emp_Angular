import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AttendanceService } from '../../services/attendance.service';
import { Exportatt } from '../../models/exportatt';
import { saveAs } from 'file-saver-es';

@Component({
  selector: 'app-export-attendance',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './export-attendance.component.html',
  styleUrl: './export-attendance.component.css'
})
export class ExportAttendanceComponent {

  exportatt:Exportatt={
    employee_id:0,
    month:'',
  };

  constructor(
    private attendanceService: AttendanceService
  ) { }

  exportcsv(): void{

    this.attendanceService.getAttendance(this.exportatt.employee_id,this.exportatt.month).subscribe({
      next:(res:any)=>{
        saveAs(res, 'data' + '.csv');
      },
      error: (e: any) => console.error(e)
    });
  }


}
