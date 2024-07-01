import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  private baseUrl = `${environment.apiBaseUrl}/images`;

  constructor(private http: HttpClient) {}

  getAllImages(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl)
      .pipe(
        catchError(error => {
          console.error('Error fetching images:', error);
          return throwError(error);
        })
      );
  }

  deleteImage(filename: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${filename}`)
      .pipe(
        catchError(error => {
          console.error('Error deleting image:', error);
          return throwError(error);
        })
      );
  }

  uploadImage(fd: FormData): Observable<any> {
    return this.http.post(`${environment.apiBaseUrl}/upload`, fd, { observe: 'response' })
      .pipe(
        map(response => {
          console.log('Response:', response);
          if (response.body) {
            return response.body;
          } else {
            throw new Error('No response body');
          }
        }),
        catchError(error => {
          console.error('Error uploading image:', error);
          return throwError(error);
        })
      );
  }

  updateEmployeeImage(employeeId: string, imageName: string): Observable<any> {
    const url = `${this.baseUrl}/updateEmployeeImage`; // Adjust the URL if necessary
    const body = { employeeId, employee_image: imageName };
    return this.http.post(url, body);
  }
}
