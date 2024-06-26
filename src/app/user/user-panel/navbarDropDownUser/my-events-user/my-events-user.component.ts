import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth/auth.service';
import { CalendarService } from 'src/app/service/calendar/calendar.service';

@Component({
  selector: 'app-my-events-user',
  templateUrl: './my-events-user.component.html',
  styleUrls: ['./my-events-user.component.css']
})
export class MyEventsUserComponent implements OnInit {
  loggedInUser: any;
  isResultLoaded = false;  // Define and initialize isResultLoaded
  userEvents: any[] = [];  // Define and initialize userEvents

  constructor(private calendarService: CalendarService, private authService: AuthService) { }

  ngOnInit(): void {
    this.loggedInUser = this.authService.getLoggedInUser();
    if (this.loggedInUser) {
      const createdBy = `${this.loggedInUser.first_name} ${this.loggedInUser.last_name}`;
      this.calendarService.getEventsByCreatedBy(createdBy).subscribe(
        (data: any) => {
          if (data.status && data.data) {
            this.userEvents = data.data;  // Assign data to userEvents
            this.isResultLoaded = true;   // Update isResultLoaded flag
          } else {
            console.log('No events found for this user.');
            this.isResultLoaded = true;   // Handle case where no events are found
          }
        },
        (error) => {
          console.error('Error fetching events:', error);
          this.isResultLoaded = true;     // Handle error case
        }
      );
    }
  }
}

