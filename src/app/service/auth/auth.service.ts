import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { UserService } from '../users/users.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedIn = false;
  private loggedInUser: any;

  constructor(private http: HttpClient, private userService: UserService) {
    const user = localStorage.getItem('loggedInUser');
    if (user) {
      this.isLoggedIn = true;
      this.loggedInUser = JSON.parse(user);
    }
  }

  login(user: any) {
    this.isLoggedIn = true;
    this.loggedInUser = {
      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      password: user.password,
      phone_number: user.phone_number,
      country: user.country,
      address: user.address,
      status: user.status,
      role: user.role,
    };
    localStorage.setItem('loggedInUser', JSON.stringify(this.loggedInUser));
  }

  logout() {
    this.isLoggedIn = false;
    this.loggedInUser = null;
    localStorage.removeItem('loggedInUser');
  }

  isAuthenticated(): boolean {
    return this.isLoggedIn;
  }

  getLoggedInUser(): any {
    return this.loggedInUser;
  }

  getLoggedInUserName(): string {
    return `${this.loggedInUser.first_name} ${this.loggedInUser.last_name}`;
  }

  changePassword(currentPassword: string, newPassword: string): Observable<boolean> {
    if (this.loggedInUser && this.loggedInUser.password === currentPassword) {
      this.loggedInUser.password = newPassword;
      console.log('Updating user with ID:', this.loggedInUser.id);
      console.log('User details before update:', this.loggedInUser);

      return this.userService.updateUser(this.loggedInUser.id, this.loggedInUser).pipe(
        map(() => {
          localStorage.setItem('loggedInUser', JSON.stringify(this.loggedInUser));
          return true;
        }),
        catchError((error) => {
          console.error('Error updating password:', error);
          return throwError(error);
        })
      );
    } else {
      return throwError(new Error('Current password is incorrect'));
    }
  }
}
