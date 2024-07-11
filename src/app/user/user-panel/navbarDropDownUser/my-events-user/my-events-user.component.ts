import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/service/auth/auth.service';
import { CalendarService } from 'src/app/service/calendar/calendar.service';

@Component({
  selector: 'app-my-events-user',
  templateUrl: './my-events-user.component.html',
  styleUrls: ['./my-events-user.component.css']
})
export class MyEventsUserComponent implements OnInit {
  loggedInUser: any;
  isResultLoaded = false;
  userEvents: any[] = [];
  pageSize = 10;
  pageIndex = 1;
  pagedArray: any[] = [];

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
            // Sorting logic
            this.userEvents = data.data.sort((a: any, b: any) => {
              const dateA = new Date(a.created_date).getTime();
              const dateB = new Date(b.created_date).getTime();
              const currentDate = new Date().getTime();
              
              // Compare dateA and dateB with currentDate
              if (dateA > currentDate && dateB > currentDate) {
                return dateA - dateB; // Sort future events first
              } else if (dateA > currentDate) {
                return -1; // Move A up
              } else if (dateB > currentDate) {
                return 1; // Move B up
              } else {
                return dateB - dateA; // Sort by created_date in descending order
              }
            });
            
            this.isResultLoaded = true;
            this.updatePagedArray();
          } else {
            console.log('No events found for this user.');
            this.isResultLoaded = true;
          }
        },
        (error) => {
          console.error('Error fetching events:', error);
          this.isResultLoaded = true;
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
      this.userEvents = this.userEvents.filter(event => event.id !== calendar.id);
      this.updatePagedArray();
    });
  }

  updatePagedArray(): void {
    const startIndex = (this.pageIndex - 1) * this.pageSize;
    const endIndex = Math.min(startIndex + this.pageSize, this.userEvents.length);
    this.pagedArray = this.userEvents.slice(startIndex, endIndex);
  }

  pageChanged(event: any): void {
    this.pageIndex = event.pageIndex + 1;
    this.updatePagedArray();
  }

  addNewEvent(newEvent: any): void {
    // Add new event to the beginning of the array
    this.userEvents.unshift(newEvent);
    
    // Update the paged array to reflect the new event
    this.updatePagedArray();
  }
}
