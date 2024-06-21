// change-pass.component.ts
import { Component } from '@angular/core';
import { AuthService } from 'src/app/service/auth/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-change-pass',
  templateUrl: './change-pass.component.html',
  styleUrls: ['./change-pass.component.css']
})
export class ChangePassComponent {
  currentPassword: string = '';
  newPassword: string = '';
  confirmPassword: string = '';

  constructor(private authService: AuthService, private snackBar: MatSnackBar) {}

  onSubmit() {
    if (this.newPassword !== this.confirmPassword) {
      this.snackBar.open('New passwords do not match!', 'Close', {
        duration: 3000,
        panelClass: ['error-snackbar']
      });
      return;
    }

    if (this.authService.changePassword(this.currentPassword, this.newPassword)) {
      this.snackBar.open('Password changed successfully!', 'Close', {
        duration: 3000,
        panelClass: ['success-snackbar']
      });
    } else {
      this.snackBar.open('Current password is incorrect!', 'Close', {
        duration: 3000,
        panelClass: ['error-snackbar']
      });
    }
  }
}
