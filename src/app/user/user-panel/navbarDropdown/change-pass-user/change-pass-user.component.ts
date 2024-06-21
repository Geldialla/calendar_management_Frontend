import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/service/auth/auth.service';

@Component({
  selector: 'app-change-pass-user',
  templateUrl: './change-pass-user.component.html',
  styleUrls: ['./change-pass-user.component.css']
})
export class ChangePassUserComponent implements OnInit {
  currentPassword: string = '';
  newPassword: string = '';
  confirmPassword: string = '';
  loggedInUser: any;

  constructor(private authService: AuthService, private snackBar: MatSnackBar) {}

  ngOnInit() {
    this.loggedInUser = this.authService.getLoggedInUser();
  }

  onSubmit() {
    if (this.newPassword !== this.confirmPassword) {
      this.snackBar.open('New passwords do not match!', 'Close', {
        duration: 3000,
        panelClass: ['error-snackbar']
      });
      return;
    }

    this.authService.changePassword(this.currentPassword, this.newPassword).subscribe(
      (success) => {
        if (success) {
          this.snackBar.open('Password changed successfully!', 'Close', {
            duration: 3000,
            panelClass: ['success-snackbar']
          });
        }
      },
      (error) => {
        this.snackBar.open('Current password is incorrect!', 'Close', {
          duration: 3000,
          panelClass: ['error-snackbar']
        });
      }
    );
  }
}