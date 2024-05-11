import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AttendanceService } from '../../services/attendance.service';
import { Attendance } from '../../models/attendance.model';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-attendance-edit',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './attendance-edit.component.html',
  styleUrls: ['./attendance-edit.component.css']
})
export class AttendanceEditComponent implements OnInit {
  attendance: Attendance = {attendance_id: 0, employee_id: 0, date: new Date(), status: '' };
  

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private attendanceService: AttendanceService
  ) { }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('attendance_id');
    const id = idParam ? +idParam : 0; // Convert to number or use a default value if null
    this.attendanceService.get(id).subscribe((attendance: Attendance) => {
      this.attendance = attendance;
    });
    
  }
  

  onSubmit(): void {
    this.attendanceService.update(this.attendance.attendance_id, this.attendance).subscribe(
      () => {
        console.log('Attendance updated successfully');
      },
      (error) => {
        console.error('Error updating attendance:', error);
      }
    );
    
    {
      this.router.navigate(['/attendance']);
    };
  }
}
