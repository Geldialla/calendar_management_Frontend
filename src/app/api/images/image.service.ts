import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  private baseUrl = 'http://localhost:8085/images';

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

  // image.service.ts
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
    return this.http.post('http://localhost:8085/upload', fd)
      .pipe(
        catchError(error => {
          console.error('Error uploading image:', error);
          return throwError(error);
        })
      );
  }
}