import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-export-attendance',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './export-attendance.component.html',
  styleUrl: './export-attendance.component.css'
})
export class ExportAttendanceComponent {
}
