import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  private calendarUrl = `${environment.apiBaseUrl}/api/calendar_event_table`;
  private approveEventUrl = `${environment.apiBaseUrl}/approve-event`;

  constructor(private http: HttpClient) { }

  getAllCalendar(): Observable<any[]> {
    return this.http.get<any[]>(`${this.calendarUrl}/`)
      .pipe(
        catchError(error => {
          console.error('Error fetching Calendar:', error);
          return throwError(error);
        })
      );
  }

  addCalendar(event: any): Observable<any> {
    const formattedEvent = this.formatEventDates(event);
    return this.http.post<any>(`${this.calendarUrl}/add`, formattedEvent)
      .pipe(
        catchError(error => {
          console.error('Error adding Calendar:', error);
          return throwError(error);
        })
      );
  }

  updateCalendar(eventId: string, event: any): Observable<any> {
    const formattedEvent = this.formatEventDates(event);
    return this.http.put<any>(`${this.calendarUrl}/update/${eventId}`, formattedEvent)
      .pipe(
        catchError(error => {
          console.error('Error updating Calendar:', error);
          return throwError(error);
        })
      );
  }

  deleteCalendar(eventId: string): Observable<any> {
    return this.http.delete<any>(`${this.calendarUrl}/delete/${eventId}`)
      .pipe(
        catchError(error => {
          console.error('Error deleting Calendar:', error);
          return throwError(error);
        })
      );
  }

  getEventsByCreatedBy(createdBy: string): Observable<any[]> {
    const params = { createdBy };
    return this.http.get<any[]>(this.calendarUrl, { params })
      .pipe(
        catchError(error => {
          console.error('Error fetching events by createdBy:', error);
          return throwError(error);
        })
      );
  }

  approveEvent(eventId: string): Observable<any> {
    return this.http.get<any>(`${this.approveEventUrl}/${eventId}`)
      .pipe(
        catchError(error => {
          console.error('Error approving event:', error);
          return throwError(error);
        })
      );
  }

  private formatEventDates(event: any): any {
    return {
      ...event,
      start_date: new Date(event.start_date).toISOString(),
      end_date: new Date(event.end_date).toISOString(),
      createdDate: new Date(event.createdDate).toISOString()
    };
  }
}
