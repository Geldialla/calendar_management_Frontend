import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  private roleUrl = `${environment.apiBaseUrl}/api/role_table`;

  constructor(private http: HttpClient) { }

  getAllRoles(): Observable<any[]> {
    return this.http.get<any[]>(`${this.roleUrl}/`)
      .pipe(
        catchError(error => {
          console.error('Error fetching Roles:', error);
          return throwError(error);
        })
      );
  }

  addRole(role: any): Observable<any> {
    return this.http.post<any>(`${this.roleUrl}/add`, role)
      .pipe(
        catchError(error => {
          console.error('Error adding Roles:', error);
          return throwError(error);
        })
      );
  }

  updateRole(roleId: string,role: any) {
    return this.http.put<any>(`${this.roleUrl}/update/${roleId}`, role)
      .pipe(
        catchError(error => {
          console.error('Error updating Roles:', error);
          return throwError(error);
        })
      );
  }

  deleteRole(roleId: string): Observable<any> {
    return this.http.delete<any>(`${this.roleUrl}/delete/${roleId}`)
      .pipe(
        catchError(error => {
          console.error('Error deleting Roles:', error);
          return throwError(error);
        })
      );
  }
}
