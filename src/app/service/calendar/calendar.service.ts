import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  private calendarUrl = `${environment.apiBaseUrl}/api/calendar_event_table`;

  constructor(private http: HttpClient) { }

  getAllCalendar(): Observable<any[]> {
    return this.http.get<any[]>(`${this.calendarUrl}/`)
      .pipe(
        catchError(error => {
          console.error('Error fetching Roles:', error);
          return throwError(error);
        })
      );
  }

  addCalendar(role: any): Observable<any> {
    return this.http.post<any>(`${this.calendarUrl}/add`, role)
      .pipe(
        catchError(error => {
          console.error('Error adding Roles:', error);
          return throwError(error);
        })
      );
  }

  updateCalendar(roleId: string,role: any) {
    return this.http.put<any>(`${this.calendarUrl}/update/${roleId}`, role)
      .pipe(
        catchError(error => {
          console.error('Error updating Roles:', error);
          return throwError(error);
        })
      );
  }

  deleteCalendar(roleId: string): Observable<any> {
    return this.http.delete<any>(`${this.calendarUrl}/delete/${roleId}`)
      .pipe(
        catchError(error => {
          console.error('Error deleting Roles:', error);
          return throwError(error);
        })
      );
  }
}
