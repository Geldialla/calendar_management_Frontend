import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/service/auth/auth.service';
import { EventModalComponent } from '../event-modal/event-modal.component';
import { CalendarService } from 'src/app/service/calendar/calendar.service';

@Component({
  selector: 'app-calendar-list',
  templateUrl: './calendar-list.component.html',
  styleUrls: ['./calendar-list.component.css']
})
export class CalendarListComponent implements OnInit {
  @ViewChild(EventModalComponent) eventModal!: EventModalComponent;
  RoleArray: any[] = [];
  isResultLoaded = false;
  isUpdateFormActive = false;
  searchKeyword: string = '';
  loggedInUser: any;
  loggedInUserName: string | undefined;

  event_name: string = '';
  start_date: Date | null = null;
  end_date: Date | null = null;
  currentCalendarID = '';

  showForm: boolean = false;
  showTable: boolean = true;

  pageSize = 10; // Number of items per page
  pageIndex = 1; // Current page index
  pagedRoleArray: any[] = []; // Array to hold the paged items

  constructor(
    private calendarService: CalendarService,
    private snackBar: MatSnackBar,
    private authService: AuthService) {
    this.getAllCalendar();
  }

  ngOnInit(): void {
    this.getAllCalendar();
    this.loggedInUser = this.authService.getLoggedInUser();
  }

  getAllCalendar() {
    this.calendarService.getAllCalendar()
      .subscribe((resultData: any) => {
        this.isResultLoaded = true;
        this.RoleArray = resultData.data;
        this.updatePagedArray();
      });
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
    const createdDate = new Date().toISOString();
    let calendar = {
      "event_name": this.event_name,
      "start_date": this.start_date,
      "end_date": this.end_date,
      "createdBy": `${this.loggedInUser.first_name} ${this.loggedInUser.last_name}`,
      "createdDate": createdDate
    };

    this.calendarService.addCalendar(calendar)
      .subscribe((resultData: any) => {
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
    this.calendarService.deleteCalendar(calendar.id)
      .subscribe((resultData) => {
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
      "event_name": this.event_name,
      "start_date": this.start_date,
      "end_date": this.end_date,
      "createdBy": `${this.loggedInUser.first_name} ${this.loggedInUser.last_name}`,
      "createdDate": createdDate
    };

    this.calendarService.updateCalendar(this.currentCalendarID, calendar)
      .subscribe((resultData: any) => {
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
    this.start_date = new Date(data.start_date);
    this.end_date = new Date(data.end_date);
    this.currentCalendarID = data.id;
    this.showForm = true;
    this.showTable = false;
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
