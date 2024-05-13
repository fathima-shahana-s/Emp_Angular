import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Attendance } from '../models/attendance.model';


const baseUrl = 'http://localhost:8080/api/attendance';


@Injectable({
  providedIn: 'root'
})
export class AttendanceService {
  data: any
  constructor(private http: HttpClient) { }

  getAll(): Observable<Attendance[]> {
   this.data = this.http.get<Attendance[]>(baseUrl)
    return this.http.get<Attendance[]>(baseUrl);
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
}
