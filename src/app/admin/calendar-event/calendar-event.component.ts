import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, throwError } from 'rxjs';
import { EventService } from 'src/app/service/events/event.service';

@Component({
  selector: 'app-calendar-event',
  templateUrl: './calendar-event.component.html',
  styleUrls: ['./calendar-event.component.css']
})
export class CalendarEventComponent  {
  EventArray: any[] = [];
  isResultLoaded = false;
  isUpdateFormActive = false;
  searchKeyword: string = '';

  event_name: string = '';
  currentEventID = '';

  constructor(
    private eventService : EventService,
    private snackBar: MatSnackBar
  ) {
    this.getAllEvents();
  }
  

  ngOnInit(): void {
    this.getAllEvents();
    this.updatePagedArray();
  }

  getAllEvents() {
    this.eventService.getAllEvents()
      .subscribe((resultData: any) => {
        this.isResultLoaded = true;
        console.log(resultData.data);
        this.EventArray = resultData.data;
        this.updatePagedArray();
      });
  }


  search(): void {
    if (this.searchKeyword.trim() !== '') {
        this.pagedEventArray = this.EventArray.filter(event_name =>
          event_name.event_name.toLowerCase().includes(this.searchKeyword.toLowerCase())
        );
    } else {
        // If search keyword is empty, display all Events
        this.updatePagedArray();
    }
}

register() {
  let event = {
    "event_name": this.event_name,
  };

  this.eventService.addEvents(event)
    .pipe(
      catchError(error => {
        console.error('Error registering Event:', error);
        return throwError(error);
      })
    )
    .subscribe((resultData: any) => {
      console.log(resultData);
      this.snackBar.open('Event Registered Successfully', 'Close', {
        duration: 6000, // Duration the snackbar should be displayed in milliseconds
        panelClass: ['success-snackbar'] // Custom CSS class for styling
      });
      this.getAllEvents();
      this.clearFormData();
      this.showTable = true;
      this.updatePagedArray();
      this.showForm = false;
    }, error => {
      console.error('Error registering Event:', error);
      this.snackBar.open('Error registering Event. Please try again.', 'Close', {
        duration: 6000,
        panelClass: ['error-snackbar']
      });
    });
}

updateEvents(event: any) {
  this.eventService.deleteEvents(event.id)
    .subscribe((resultData) => {
      console.log(resultData);
      this.snackBar.open('Event Deleted Successfully', 'Close', {
        duration: 6000,
        panelClass: ['success-snackbar']
      });
      this.getAllEvents();
    });
}

updateRecords() {
  let event = {
    "event_name": this.event_name,
  };

  this.eventService.updateEvents(this.currentEventID, event)
    .subscribe((resultData: any) => {
      console.log(resultData);
      this.snackBar.open('Event Updated successfully', 'Close', {
        duration: 6000,
        panelClass: ['success-snackbar']
      });
      this.getAllEvents();
      // Close the form after updating
      this.showForm = false;
    });
}

save() {
  if (this.currentEventID === '') {
    this.register();
  } else {
    this.updateRecords();
  }
  // Clear form data
  this.clearFormData();
  // Show the table
  this.showTable = true;
  // Update paged array
  this.updatePagedArray();
}

clearFormData() {
  this.event_name = '';
  this.currentEventID = '';
}

setDelete(data: any) {
  this.snackBar.open('Are you sure you want to delete this Event?', 'Confirm', {
    duration: 6000,
    panelClass: ['confirm-snackbar']
  }).onAction().subscribe(() => {
    this.updateEvents(data);
  });
}

setUpdate(data: any) {
  this.event_name = data.event_name;

  // Convert start_date and end_date strings to Date objects
  const startDate = new Date(data.start_date);
  const endDate = new Date(data.end_date);

  // Format the dates as "yyyy-MM-dd"
  const formattedStartDate = this.formatDate(startDate);
  const formattedEndDate = this.formatDate(endDate);

  // Assign the formatted dates to the component properties

  this.currentEventID = data.id;
  // Show the form when editing
  this.showForm = true;
  this.showTable = false;
}

// Helper function to format date as "yyyy-MM-dd"
formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Add leading zero if needed
  const day = date.getDate().toString().padStart(2, '0'); // Add leading zero if needed

  return `${year}-${month}-${day}`;
}

// Other component properties

showForm: boolean = false;
showTable: boolean = true;

// Method to toggle the visibility of the form
toggleFormVisibility() {
  this.showForm = !this.showForm; // Toggle the form visibility
  this.showTable = false; // Ensure the table is hidden when showing the form
}

// Method to close the form
closeForm() {
  this.showForm = false;
}

// Method to handle going back
goBack() {
  // Close the form when going back
  this.closeForm();
  // Clear form data
  this.clearFormData();
  // Show the table
  this.showTable = true;
  // Update paged array
  this.updatePagedArray();
}

// pagination

pageSize = 10; // Number of items per page
pageIndex = 1; // Current page index
pagedEventArray: any[] = []; // Array to hold the paged items

updatePagedArray(): void {
  const startIndex = (this.pageIndex - 1) * this.pageSize;
  const endIndex = Math.min(startIndex + this.pageSize, this.EventArray.length);

  console.log("Start Index:", startIndex);
  console.log("End Index:", endIndex);
  console.log("Total Length:", this.EventArray.length);

  this.pagedEventArray = this.EventArray.slice(startIndex, endIndex);
}

pageChanged(event: any): void {
  this.pageIndex = event.pageIndex + 1; // +1 to match 1-based indexing
  this.updatePagedArray(); // Update paged array when page changes
}

}

