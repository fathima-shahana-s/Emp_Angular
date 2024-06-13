import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Attendance } from '../models/attendance.model';
import { saveAs } from 'file-saver-es';

const baseUrl = 'http://localhost:8081/api/attendance';
const csvurl = 'http://localhost:8081/api/getcsv'

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {
  constructor(private http: HttpClient) { }

  getAll(): Observable<{ status: number, result: Attendance[] }> {
   //this.data = this.http.get<Attendance[]>(baseUrl)
    return this.http.get<{ status: number, result: Attendance[] }>(baseUrl);
  }

  get(id: number | string): Observable<Attendance> {
    return this.http.get<Attendance>(`${baseUrl}/${id}`);
  }

  create(data: Attendance): Observable<Attendance> {
    return this.http.post(baseUrl, data);
  }

  update(id: number | string, data: Attendance): Observable<Attendance> {
    return this.http.put(`${baseUrl}/${id}`, data);
  }

  delete(id: number): Observable<Attendance> {
    console.log(id)
    return this.http.delete(`${baseUrl}/${id}`);
  }

  deleteAll(): Observable<void> {
    return this.http.delete<void>(baseUrl);
  }

  findByTitle(title: string): Observable<Attendance[]> {
    return this.http.get<Attendance[]>(`${baseUrl}?title=${title}`);
  }

  public downloadExcel<T>(data: { body: T; fileName: string }): void {
    const url: string = '[api endpoint here ]';
    this.http.post(url, data.body, { responseType: 'blob' })
      .subscribe((response: Blob) => saveAs(response, data.fileName + '.xlsx'));
  }
  getAttendance(employee_id: number | string, month: string,): Observable<Blob>{
    console.log()
    // this.http.get(`${baseurl}?employee_id=${employee_id}&month=${month}`, { responseType: 'blob' })
    //   .subscribe((response: Blob) => saveAs(response, 'data' + '.csv'));

    return this.http.get(`${csvurl}?employee_id=${employee_id}&month=${month}`, { responseType: 'blob' });
  }
}
