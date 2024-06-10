import { Component, ElementRef, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth.service';

declare var $: any; // Declare $ for using jQuery

@Component({
  selector: 'app-super-admin-panel',
  templateUrl: './super-admin-panel.component.html',
  styleUrls: ['./super-admin-panel.component.css']
})
export class SuperAdminPanelComponent implements OnInit {
  loggedInUser: any;

  constructor(private elRef: ElementRef, private authService: AuthService) { }

  ngOnInit(): void {
    // Get logged-in user information
    this.loggedInUser = this.authService.getLoggedInUser();

    // jQuery code for toggling sidebar
    $(this.elRef.nativeElement).find('#sidebarCollapse').on('click', function () {
      $('#sidebar').toggleClass('active');
    });
  }
}
