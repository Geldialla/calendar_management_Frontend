import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private eventUrl = `${environment.apiBaseUrl}/api/event_table`;

  constructor(private http: HttpClient) { }

  getAllEvents(): Observable<any[]> {
    return this.http.get<any[]>(`${this.eventUrl}/`)
      .pipe(
        catchError(error => {
          console.error('Error fetching Events:', error);
          return throwError(error);
        })
      );
  }

  addEvents(event: any): Observable<any> {
    return this.http.post<any>(`${this.eventUrl}/add`, event)
      .pipe(
        catchError(error => {
          console.error('Error adding Events:', error);
          return throwError(error);
        })
      );
  }

  updateEvents(eventId: string,event: any) {
    return this.http.put<any>(`${this.eventUrl}/update/${eventId}`, event)
      .pipe(
        catchError(error => {
          console.error('Error updating Events:', error);
          return throwError(error);
        })
      );
  }

  deleteEvents(eventId: string): Observable<any> {
    return this.http.delete<any>(`${this.eventUrl}/delete/${eventId}`)
      .pipe(
        catchError(error => {
          console.error('Error deleting Events:', error);
          return throwError(error);
        })
      );
  }
}
