// change-password.component.ts
import { Component } from '@angular/core';
import { AuthService } from 'src/app/service/auth/auth.service';

@Component({
  selector: 'app-change-pass',
  templateUrl: './change-pass.component.html',
  styleUrls: ['./change-pass.component.css']
})
export class ChangePassComponent {
  currentPassword: string = '';
  newPassword: string = '';
  confirmPassword: string = '';

  constructor(private authService: AuthService) {}

  onSubmit() {
    if (this.newPassword !== this.confirmPassword) {
      alert('New passwords do not match!');
      return;
    }

    if (this.authService.changePassword(this.currentPassword, this.newPassword)) {
      alert('Password changed successfully!');
    } else {
      alert('Current password is incorrect!');
    }
  }

}
