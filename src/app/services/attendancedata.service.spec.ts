import { TestBed } from '@angular/core/testing';

import { AttendanceDataService } from './attendancedata.service';

describe('AttendencedataService', () => {
  let service: AttendanceDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AttendanceDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
