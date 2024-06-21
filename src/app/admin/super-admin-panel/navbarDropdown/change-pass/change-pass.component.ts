import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-change-pass',
  templateUrl: './change-pass.component.html',
  styleUrls: ['./change-pass.component.css']
})
export class ChangePassComponent implements OnInit {
  currentPassword: string = '';
  newPassword: string = '';
  confirmPassword: string = '';
  loggedInUser: any;
  showCurrentPassword: boolean = false;
  showNewPassword: boolean = false;
  showConfirmPassword: boolean = false;

  passwordRequirements = {
    length: false,
    uppercase: false,
    number: false,
    specialChar: false
  };



  constructor(private authService: AuthService, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.loggedInUser = this.authService.getLoggedInUser();
  }

  togglePasswordVisibility(field: string) {
    switch (field) {
      case 'current':
        this.showCurrentPassword = !this.showCurrentPassword;
        break;
      case 'new':
        this.showNewPassword = !this.showNewPassword;
        break;
      case 'confirm':
        this.showConfirmPassword = !this.showConfirmPassword;
        break;
    }
  }


  validatePassword() {
    this.passwordRequirements.length = this.newPassword.length >= 8;
    this.passwordRequirements.uppercase = /[A-Z]/.test(this.newPassword);
    this.passwordRequirements.number = /[0-9]/.test(this.newPassword);
    this.passwordRequirements.specialChar = /[!@#$%^&*(),.?":{}|<>]/.test(this.newPassword);
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

  resetForm() {
    this.currentPassword = '';
    this.newPassword = '';
    this.confirmPassword = '';
    this.passwordRequirements = {
      length: false,
      uppercase: false,
      number: false,
      specialChar: false
    };
  }

}
