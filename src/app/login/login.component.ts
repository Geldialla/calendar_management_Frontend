import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth/auth.service';
import { UserService } from 'src/app/service/users/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(
    private router: Router,
    private userService: UserService,
    private snackBar: MatSnackBar,
    private authService: AuthService
  ) { }

  UserArray: any[] = [];
  email: string = '';
  password: string = '';
  role: string = '';
  isResultLoaded = false;

  // Hard-coded admin credentials
  adminEmail: string = 'admin';
  adminPassword: string = 'admin';

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers() {
    this.userService.getAllUsers()
      .subscribe((resultData: any) => {
        this.isResultLoaded = true;
        console.log(resultData.data);
        this.UserArray = resultData.data;
      }, error => {
        this.isResultLoaded = false;
        console.error('Error fetching users:', error);
      });
  }

  login() {
    if (this.email === this.adminEmail && this.password === this.adminPassword) {
      // Admin login successful
      this.router.navigate(['/SuperAdminPanel/Calendar']);
    } else {
      // Regular user login
      const user = this.UserArray.find(u => u.email === this.email && u.password === this.password);
      if (user) {
        if (!user.status) {
          // User status is inactive
          this.snackBar.open('Your account is inactive. Please contact an administrator.', 'Close', {
            duration: 3000,
            panelClass: ['error-snackbar']
          });
          return; // Exit function early if status is inactive
        }
  
        // User login successful
        if (user.role === 'admin') {
          this.router.navigate(['/SuperAdminPanel/Calendar']);
        } else if (user.role === 'manager') {
          this.router.navigate(['/Manager/Calendar']);
        } else if (user.role === 'user') {
          this.router.navigate(['/User/Calendar']);
        }
  
        // Show success message
        this.snackBar.open('Successfully logged in', 'Close', {
          duration: 3000,
          panelClass: ['success-snackbar']
        });
  
        // Save user information in local storage
        localStorage.setItem('loggedInUserFirstName', user.first_name);
        localStorage.setItem('loggedInUserLastName', user.last_name);
  
        // Call authService login method
        this.authService.login(user);
      } else {
        // Login failed
        this.snackBar.open('Invalid email or password', 'Close', {
          duration: 3000,
          panelClass: ['error-snackbar']
        });
      }
    }
  }
  


}