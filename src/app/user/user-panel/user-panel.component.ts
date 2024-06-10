import { Component, ElementRef, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
declare var $: any; // Declare $ for using jQuery

@Component({
  selector: 'app-user-panel',
  templateUrl: './user-panel.component.html',
  styleUrls: ['./user-panel.component.css']
})
export class UserPanelComponent implements OnInit {
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
