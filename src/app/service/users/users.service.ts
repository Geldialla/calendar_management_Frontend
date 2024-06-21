import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private UserUrl = `${environment.apiBaseUrl}/api/users_table`;

  constructor(private http: HttpClient) { }

  getAllUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.UserUrl}/`)
      .pipe(
        catchError(error => {
          console.error('Error fetching users:', error);
          return throwError(error);
        })
      );
  }

  addUser(user: any): Observable<any> {
    return this.http.post<any>(`${this.UserUrl}/add`, user)
      .pipe(
        catchError(error => {
          console.error('Error adding user:', error);
          return throwError(error);
        })
      );
  }

  updateUser(userId: string, user: any): Observable<any> {
    console.log('User ID:', userId);
    console.log('User data:', user);
    return this.http.put<any>(`${this.UserUrl}/update/${userId}`, user)
      .pipe(
        catchError(error => {
          console.error('Error updating user:', error);
          return throwError(error);
        })
      );
  }

  deleteUser(userId: string): Observable<any> {
    return this.http.delete<any>(`${this.UserUrl}/delete/${userId}`)
      .pipe(
        catchError(error => {
          console.error('Error deleting user:', error);
          return throwError(error);
        })
      );
  }
}
