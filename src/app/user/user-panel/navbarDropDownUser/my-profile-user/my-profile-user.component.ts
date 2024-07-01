import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth/auth.service';
import { UserService } from 'src/app/service/users/users.service';

@Component({
  selector: 'app-my-profile-user',
  templateUrl: './my-profile-user.component.html',
  styleUrls: ['./my-profile-user.component.css']
})
export class MyProfileUserComponent implements OnInit {
  UserArray: any[] = [];
  loggedInUser: any;
  userProfile: any;
  errorMessage: string = '';
  profileItems: { label: string, value: string }[] = [
    { label: 'First Name', value: 'first_name' },
    { label: 'Last Name', value: 'last_name' },
    { label: 'Email', value: 'email' },
    { label: 'Phone Number', value: 'phone_number' },
    { label: 'Status', value: 'role' },
    { label: 'Role', value: 'employee_role' },
    { label: 'Supervisor', value: 'employee_supervisor' }
  ];

  constructor(
    private authService: AuthService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.loggedInUser = this.authService.getLoggedInUser();

    this.userService.getAllUsers().subscribe(
      (response: any) => {
        console.log('API Response:', response); // Debugging log

        if (response.status === true && Array.isArray(response.data)) {
          this.UserArray = response.data;

          this.userProfile = this.UserArray.find(user => user.email === this.loggedInUser.email);

          if (!this.userProfile) {
            this.errorMessage = 'User not found in the database.';
          }
        } else {
          this.errorMessage = 'Invalid response from server.';
        }
      },
      error => {
        console.error('Error fetching users:', error);
        this.errorMessage = 'Error fetching users from API.';
      }
    );
  }
}