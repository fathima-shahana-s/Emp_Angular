import { TestBed } from '@angular/core/testing';

import { AttendancedataService } from './attendancedata.service';

describe('AttendencedataService', () => {
  let service: AttendancedataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AttendancedataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
