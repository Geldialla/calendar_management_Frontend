import { Component, ElementRef, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
declare var $: any; // Declare $ for using jQuery

@Component({
  selector: 'app-manager-panel',
  templateUrl: './manager-panel.component.html',
  styleUrls: ['./manager-panel.component.css']
})
export class ManagerPanelComponent implements OnInit {
  loggedInUser: any;

  constructor(private elRef: ElementRef, private authService: AuthService) { }

  ngOnInit(): void {
    // Get logged-in user information
    this.loggedInUser = this.authService.getLoggedInUser();

    // jQuery code for toggling sidebar
    $(this.elRef.nativeElement).find('#sidebarCollapse').on('click', function () {
      $('#sidebar').toggleClass('active');
      
      // Wait for the sidebar animation to complete, then trigger a resize on the calendar
      setTimeout(() => {
        const calendarEl = document.querySelector('full-calendar');
        if (calendarEl && (calendarEl as any).getApi) {
          (calendarEl as any).getApi().updateSize();
        }
      }, 300); // Adjust the timeout duration to match the sidebar animation duration
    });
  }
}
