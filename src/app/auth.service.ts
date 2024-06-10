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
    this.loggedInUser = user;
    // Save user information in localStorage for persistence
    localStorage.setItem('loggedInUser', JSON.stringify(user));
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
}
