import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(private router: Router, private http: HttpClient, private snackBar: MatSnackBar) {}

  UserArray: any[] = [];
  email: string = '';  // Default email field
  password: string = '';  // Default password field
  isResultLoaded = false;

  // Hard-coded admin credentials
  adminEmail: string = 'admin';
  adminPassword: string = 'admin';

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers() {
    this.http.get("http://localhost:8085/api/users_table/")
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
      this.router.navigate(['/SuperAdminPanel/Dashboard']);
    } else {
      // Regular user login
      const user = this.UserArray.find(u => u.email === this.email && u.password === this.password);

      if (user) {
        // User login successful
        this.router.navigate(['/SuperAdminPanel/Dashboard']);
        this.snackBar.open('Successfully login', 'Close', {
          duration: 3000,
          panelClass: ['success-snackbar']
        });
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
