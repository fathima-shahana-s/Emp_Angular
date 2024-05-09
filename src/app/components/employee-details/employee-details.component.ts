import { Component } from '@angular/core';

@Component({
  selector: 'app-employee-details',
  standalone: true,
  imports: [],
  templateUrl: './employee-details.component.html',
  styleUrl: './employee-details.component.css'
})
export class EmployeeDetailsComponent {
  @Input() viewMode = false;

  @Input() currentTutorial: Employee = {
    title: '',
    description: '',
    published: false
  };
}