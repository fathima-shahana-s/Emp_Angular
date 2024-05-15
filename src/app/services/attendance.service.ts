import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Attendance } from '../models/attendance.model';
import { saveAs } from 'file-saver-es';

const baseUrl = 'http://localhost:8081/api/attendance';


@Injectable({
  providedIn: 'root'
})
export class AttendanceService {
  data: any
  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
   //this.data = this.http.get<Attendance[]>(baseUrl)
    return this.http.get<any>(baseUrl);
  }

  get(id: any): Observable<Attendance> {
    return this.http.get<Attendance>(`${baseUrl}/${id}`);
  }

  create(data: any): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(baseUrl);
  }

  findByTitle(title: any): Observable<Attendance[]> {
    return this.http.get<Attendance[]>(`${baseUrl}?title=${title}`);
  }

  public downloadExcel(data:any): void {
    const url: string = '[api endpoint here ]';
    this.http.post(url, data.body, { responseType: 'blob' })
      .subscribe((response: Blob) => saveAs(response, data.fileName + '.xlsx'));
  }
  getAttendance(employee_id: any, month: any,): Observable<Blob>{
    console.log()
    // this.http.get(`${baseurl}?employee_id=${employee_id}&month=${month}`, { responseType: 'blob' })
    //   .subscribe((response: Blob) => saveAs(response, 'data' + '.csv'));

    return this.http.get(`${baseUrl}?employee_id=${employee_id}&month=${month}`, { responseType: 'blob' });
  }
}
