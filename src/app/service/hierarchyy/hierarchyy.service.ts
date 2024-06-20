import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class HierarchyyService {

  private hierarchyUrl = `${environment.apiBaseUrl}/api/hierarchy_table`;
  private roleUrl = `${environment.apiBaseUrl}/api/role_table`;
  private UserUrl = `${environment.apiBaseUrl}/api/users_table`;

  constructor(private http: HttpClient) { }

  getAllHierarchyy(): Observable<any[]> {
    return this.http.get<any[]>(`${this.hierarchyUrl}/`)
      .pipe(
        catchError(error => {
          console.error('Error fetching hierarchyy:', error);
          return throwError(error);
        })
      );
  }

  getAllRoles(): Observable<any[]> {
    return this.http.get<any[]>(`${this.roleUrl}/`)
      .pipe(
        catchError(error => {
          console.error('Error fetching Roles:', error);
          return throwError(error);
        })
      );
  }

  getAllUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.UserUrl}/`)
      .pipe(
        catchError(error => {
          console.error('Error fetching users:', error);
          return throwError(error);
        })
      );
  }

  addHierarchyy(hierarchyy: any): Observable<any> {
    return this.http.post<any>(`${this.hierarchyUrl}/add`, hierarchyy)
      .pipe(
        catchError(error => {
          console.error('Error adding user:', error);
          return throwError(error);
        })
      );
  }

  updateHierarchyy(hierarchyyId: string, hierarchyy: any) {
    return this.http.put<any>(`${this.hierarchyUrl}/update/${hierarchyyId}`, hierarchyy)
      .pipe(
        catchError(error => {
          console.error('Error updating hierarchyy:', error);
          return throwError(error);
        })
      );
  }

  deleteHierarchyy(hierarchyyId: string): Observable<any> {
    return this.http.delete<any>(`${this.hierarchyUrl}/delete/${hierarchyyId}`)
      .pipe(
        catchError(error => {
          console.error('Error deleting hierarchyy:', error);
          return throwError(error);
        })
      );
  }
}
