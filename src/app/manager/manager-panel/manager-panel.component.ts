import { Component, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth/auth.service';
declare var $: any; // Declare $ for using jQuery

@Component({
  selector: 'app-manager-panel',
  templateUrl: './manager-panel.component.html',
  styleUrls: ['./manager-panel.component.css']
})
export class ManagerPanelComponent implements OnInit {
  loggedInUser: any;
  firstName: string | null = null;
  lastName: string | null = null;

  constructor(private elRef: ElementRef, private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    // Get logged-in user information
    this.loggedInUser = this.authService.getLoggedInUser();
    this.firstName = localStorage.getItem('loggedInUserFirstName');
    this.lastName = localStorage.getItem('loggedInUserLastName');

    // jQuery code for toggling sidebar
    $(this.elRef.nativeElement).find('#sidebarCollapse').on('click', function () {
      $('#sidebar').toggleClass('active');
    });
  }

  logout(): void {
    // Remove first name and last name from local storage
    localStorage.removeItem('loggedInUserFirstName');
    localStorage.removeItem('loggedInUserLastName');
    // Call logout method of AuthService
    this.authService.logout();
    // Navigate to login page
    this.router.navigate(['/Login']);
  }
}