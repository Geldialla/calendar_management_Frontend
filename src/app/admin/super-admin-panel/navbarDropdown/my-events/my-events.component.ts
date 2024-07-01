// my-events.component.ts

import { Component, OnInit } from '@angular/core';
import { CalendarService } from 'src/app/service/calendar/calendar.service';
import { AuthService } from 'src/app/service/auth/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-my-events',
  templateUrl: './my-events.component.html',
  styleUrls: ['./my-events.component.css']
})
export class MyEventsComponent implements OnInit {
  loggedInUser: any;
  isResultLoaded = false;  // Define and initialize isResultLoaded
  userEvents: any[] = [];  // Define and initialize userEvents

  pageSize = 10; // Number of items per page
  pageIndex = 1; // Current page index
  pagedArray: any[] = []; // Array to hold the paged items
  constructor(
    private calendarService: CalendarService,
    private snackBar: MatSnackBar,
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
            this.updatePagedArray();      // Update paged array after data is loaded
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

  setDelete(data: any) {
    this.snackBar.open('Are you sure you want to delete this event?', 'Confirm', {
      duration: 6000,
      panelClass: ['confirm-snackbar']
    }).onAction().subscribe(() => {
      this.deleteRecord(data);
    });
  }

  deleteRecord(calendar: any) {
    this.calendarService.deleteCalendar(calendar.id).subscribe(() => {
      this.snackBar.open('Event Deleted Successfully', 'Close', {
        duration: 6000,
        panelClass: ['success-snackbar']
      });
      // Remove the deleted event from userEvents
      this.userEvents = this.userEvents.filter(event => event.id !== calendar.id);
      // Update the paged array to refresh the table
      this.updatePagedArray();
    });
  }

  updatePagedArray(): void {
    const startIndex = (this.pageIndex - 1) * this.pageSize;
    const endIndex = Math.min(startIndex + this.pageSize, this.userEvents.length);

    console.log("Start Index:", startIndex);
    console.log("End Index:", endIndex);
    console.log("Total Length:", this.userEvents.length);

    this.pagedArray = this.userEvents.slice(startIndex, endIndex);
  }

  pageChanged(event: any): void {
    this.pageIndex = event.pageIndex + 1;
    this.updatePagedArray();
  }
}
