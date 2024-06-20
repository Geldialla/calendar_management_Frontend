import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedIn = false;
  private loggedInUser: any; // Store logged-in user's information

  constructor() {
    // Retrieve logged-in user from local storage on service initialization
    const user = localStorage.getItem('loggedInUser');
    if (user) {
      this.isLoggedIn = true;
      this.loggedInUser = JSON.parse(user);
    }
  }

  login(user: any) {
    this.isLoggedIn = true;
    this.loggedInUser = {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      password: user.password,
      phone_number: user.phone_number,
      country: user.country,
      address: user.address,
      status: user.status,
      role: user.role,
    };
    // Save user information in localStorage for persistence
    localStorage.setItem('loggedInUser', JSON.stringify(this.loggedInUser));
  }

  logout() {
    this.isLoggedIn = false;
    this.loggedInUser = null;
    localStorage.removeItem('loggedInUser'); // Remove user information from localStorage on logout
  }

  isAuthenticated(): boolean {
    return this.isLoggedIn;
  }

  getLoggedInUser(): any {
    // Retrieve logged-in user information from the property
    return this.loggedInUser;
  }

  getLoggedInUserName(): string {
    // Retrieve logged-in user's full name
    return `${this.loggedInUser.firstName} ${this.loggedInUser.lastName}`;
  }

  changePassword(currentPassword: string, newPassword: string): boolean {
    if (this.loggedInUser && this.loggedInUser.password === currentPassword) {
      this.loggedInUser.password = newPassword;
      localStorage.setItem('loggedInUser', JSON.stringify(this.loggedInUser));
      return true;
    }
    return false;
  }

}
