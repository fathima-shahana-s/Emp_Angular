import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { AttendanceEditComponent } from './attendance-edit.component';

describe('AttendanceEditComponent', () => {
  let component: AttendanceEditComponent;
  let fixture: ComponentFixture<AttendanceEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [AttendanceEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AttendanceEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
