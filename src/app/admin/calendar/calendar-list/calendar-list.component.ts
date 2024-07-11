import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/service/auth/auth.service';
import { EventModalComponent } from '../event-modal/event-modal.component';
import { CalendarService } from 'src/app/service/calendar/calendar.service';
import { EventService } from 'src/app/service/events/event.service';

@Component({
  selector: 'app-calendar-list',
  templateUrl: './calendar-list.component.html',
  styleUrls: ['./calendar-list.component.css']
})
export class CalendarListComponent implements OnInit {
  @ViewChild(EventModalComponent) eventModal!: EventModalComponent;
  RoleArray: any[] = [];
  isResultLoaded = false;
  searchKeyword: string = '';
  loggedInUser: any;
  loggedInUserName: string | undefined;

  event_name: string = '';
  start_date: string | null = null;
  end_date: string | null = null;

  currentCalendarID = '';

  showForm: boolean = false;
  showTable: boolean = true;

  pageSize = 10; // Number of items per page
  pageIndex = 1; // Current page index
  pagedRoleArray: any[] = []; // Array to hold the paged items
  EventArray: any[] = [];

  constructor(
    private calendarService: CalendarService,
    private snackBar: MatSnackBar,
    private authService: AuthService,
    private eventService: EventService,
  ) {
    this.getAllCalendar();
    this.getAllEvents();
  }

  ngOnInit(): void {
    this.getAllEvents();
    this.loggedInUser = this.authService.getLoggedInUser();
  }

  getAllCalendar() {
    this.calendarService.getAllCalendar().subscribe((resultData: any) => {
      this.isResultLoaded = true;
      this.RoleArray = resultData.data;
      this.sortEventsByCreatedDate();
      this.updatePagedArray();
    });
  }
  getAllEvents() {
    this.eventService.getAllEvents()
      .subscribe((resultData: any) => {
        this.EventArray = resultData.data;
      });
  }

  sortEventsByCreatedDate() {
    this.RoleArray.sort((a, b) => new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime());
  }

  search(): void {
    if (this.searchKeyword.trim() !== '') {
      this.pagedRoleArray = this.RoleArray.filter(user_role =>
        user_role.event_name.toLowerCase().includes(this.searchKeyword.toLowerCase())
      );
    } else {
      this.updatePagedArray();
    }
  }

  addCalendar() {
    // Convert start_date and end_date from string to Date
    let start_date = this.start_date ? new Date(this.start_date) : null;
    let end_date = this.end_date ? new Date(this.end_date) : null;
    
    const createdDate = new Date().toISOString();
    let calendar = {
      event_name: this.event_name,
      start_date: start_date,
      end_date: end_date,
      createdBy: `${this.loggedInUser.first_name} ${this.loggedInUser.last_name}`,
      createdDate: createdDate,
      approved: false // Default approval status
    };
  
    this.calendarService.addCalendar(calendar).subscribe((resultData: any) => {
      this.snackBar.open('Event Registered Successfully', 'Close', {
        duration: 6000,
        panelClass: ['success-snackbar']
      });
      this.getAllCalendar();
      this.clearFormData();
      this.showTable = true;
      this.showForm = false;
    });
  }
  

  deleteRecord(calendar: any) {
    this.calendarService.deleteCalendar(calendar.id).subscribe(() => {
      this.snackBar.open('Event Deleted Successfully', 'Close', {
        duration: 6000,
        panelClass: ['success-snackbar']
      });
      this.getAllCalendar();
    });
  }

  updateRecords() {
    const createdDate = new Date().toISOString();
    let calendar = {
      event_name: this.event_name,
      start_date: this.start_date,
      end_date: this.end_date,
      createdBy: `${this.loggedInUser.first_name} ${this.loggedInUser.last_name}`,
      createdDate: createdDate
    };

    this.calendarService.updateCalendar(this.currentCalendarID, calendar).subscribe(() => {
      this.snackBar.open('Event Updated successfully', 'Close', {
        duration: 6000,
        panelClass: ['success-snackbar']
      });
      this.getAllCalendar();
      this.showForm = false;
    });
  }

  save() {
    if (this.currentCalendarID === '') {
      this.addCalendar();
    } else {
      this.updateRecords();
    }
    this.clearFormData();
    this.showTable = true;
    this.updatePagedArray();
  }

  clearFormData() {
    this.event_name = '';
    this.start_date = null;
    this.end_date = null;
    this.currentCalendarID = '';
  }

  setDelete(data: any) {
    this.snackBar.open('Are you sure you want to delete this event?', 'Confirm', {
      duration: 6000,
      panelClass: ['confirm-snackbar']
    }).onAction().subscribe(() => {
      this.deleteRecord(data);
    });
  }

  setUpdate(data: any) {
    this.event_name = data.event_name;
    // Format dates to "yyyy-MM-ddThh:mm"
    this.start_date = data.start_date ? new Date(data.start_date).toISOString().slice(0, 16) : null;
    this.end_date = data.end_date ? new Date(data.end_date).toISOString().slice(0, 16) : null;
    this.currentCalendarID = data.id;
    this.showForm = true;
    this.showTable = false;
  }
  
  toggleApprovalStatus(event: any) {
    event.approved = !event.approved; // Toggle approved status
    this.calendarService.updateCalendar(event.id, event).subscribe(
      () => {
        this.snackBar.open('Approval status updated successfully', 'Close', {
          duration: 6000,
          panelClass: ['success-snackbar']
        });
        this.getAllCalendar();
      },
      error => {
        console.error('Error updating approval status:', error);
        this.snackBar.open('Failed to update approval status', 'Close', {
          duration: 6000,
          panelClass: ['error-snackbar']
        });
        // Revert the change if update fails (optional)
        event.approved = !event.approved;
      }
    );
  }

  toggleFormVisibility() {
    this.showForm = !this.showForm;
    this.showTable = !this.showForm;
    if (this.showForm) {
      this.eventModal.loggedInUser = this.loggedInUser; // Pass logged-in user's information to the modal
    }
  }

  closeForm() {
    this.showForm = false;
    this.showTable = true;
  }

  goBack() {
    this.closeForm();
    this.clearFormData();
    this.showTable = true;
    this.updatePagedArray();
  }

  updatePagedArray(): void {
    const startIndex = (this.pageIndex - 1) * this.pageSize;
    const endIndex = Math.min(startIndex + this.pageSize, this.RoleArray.length);
    this.pagedRoleArray = this.RoleArray.slice(startIndex, endIndex);
  }

  pageChanged(event: any): void {
    this.pageIndex = event.pageIndex + 1;
    this.updatePagedArray();
  }
}
