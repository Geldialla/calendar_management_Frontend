// my-events.component.ts

import { Component, OnInit } from '@angular/core';
import { CalendarService } from 'src/app/service/calendar/calendar.service';
import { AuthService } from 'src/app/service/auth/auth.service';

@Component({
  selector: 'app-my-events',
  templateUrl: './my-events.component.html',
  styleUrls: ['./my-events.component.css']
})
export class MyEventsComponent implements OnInit {
  loggedInUser: any;
  isResultLoaded = false;  // Define and initialize isResultLoaded
  userEvents: any[] = [];  // Define and initialize userEvents

  constructor(
    private calendarService: CalendarService,
    private authService: AuthService
  ) { }

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
