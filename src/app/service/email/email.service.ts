import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  private apiUrl = `${environment.apiBaseUrl}/send-email`;

  constructor(private http: HttpClient) { }

  sendEmail(email: string, subject: string, message: string, eventId: number): Observable<any> {
    const emailData = { email, subject, message, eventId };
    return this.http.post<any>(this.apiUrl, emailData)
      .pipe(
        catchError(error => {
          console.error('Error sending email:', error);
          return throwError(error);
        })
      );
  }


  sendEmailVerification(email: string, subject: string, message: string,eventId: number ): Observable<any> {
    const emailData = { email, subject, message, eventId };
    return this.http.post<any>(this.apiUrl, emailData)
      .pipe(
        catchError(error => {
          console.error('Error sending email:', error);
          throw error; // Rethrow or handle as needed
        })
      );
  }

  
  
}
