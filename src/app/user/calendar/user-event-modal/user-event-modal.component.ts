import { Component, EventEmitter, Output, ElementRef, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/service/auth/auth.service';

@Component({
  selector: 'app-user-event-modal',
  templateUrl: './user-event-modal.component.html',
  styleUrls: ['./user-event-modal.component.css']
})
export class UserEventModalComponent {
  CalendarArray: any[] = [];
  isResultLoaded = false;
  isUpdateFormActive = false;
  loggedInUser: any;
  firstName: string | null = null;
  lastName: string | null = null;

  event_name: string = '';
  start_date: Date | null = null;
  end_date: Date | null = null;
  currentCalendarID = '';

  EventArray: any[] = [];
  eventTitle: string = '';
  eventStart: string = '';
  eventEnd: string = '';

  @ViewChild('modal') modal!: ElementRef;
  @Output() eventAdded = new EventEmitter<{ title: string, start: string, end: string, createdBy: string, createdDate: string }>();
  @Output() modalClosed = new EventEmitter<void>();
  @Output() eventSubmitted = new EventEmitter<void>();


  constructor(private http: HttpClient, private snackBar: MatSnackBar, private authService: AuthService) {
    this.getAllEvents();
    this.getAllCalendarEvents();
    this.getLoggedInUser()
  }

  ngOnInit(): void {
    this.getAllEvents();
    this.getAllCalendarEvents();
    this.loggedInUser = this.authService.getLoggedInUser();
  }

  getLoggedInUser() {
    this.firstName = localStorage.getItem('loggedInUserFirstName');
    this.lastName = localStorage.getItem('loggedInUserLastName');
  }
  

  getAllCalendarEvents() {
    this.http.get("http://localhost:8085/api/calendar_event_table/")
      .subscribe((resultData: any) => {
        this.isResultLoaded = true;
        this.CalendarArray = resultData.data;
      });
  }

  register() {
    const createdDate = new Date().toISOString();

    let bodyData = {
      "event_name": this.event_name,
      "start_date": this.start_date,
      "end_date": this.end_date,
      "createdBy": `${this.firstName} ${this.lastName}`, // Corrected
      "createdDate": createdDate
    };
  
    this.http.post("http://localhost:8085/api/calendar_event_table/add", bodyData)
      .subscribe((resultData: any) => {
        this.snackBar.open('Event Registered Successfully', 'Close', {
          duration: 6000,
          panelClass: ['success-snackbar']
        });
        this.getAllCalendarEvents();
      });
  }
  
  deleteRecord(data: any) {
    this.http.delete("http://localhost:8085/api/calendar_event_table/delete" + "/" + data.id)
      .subscribe((resultData) => {
        this.snackBar.open('Event Deleted Successfully', 'Close', {
          duration: 6000,
          panelClass: ['success-snackbar']
        });
        this.getAllCalendarEvents();
      });
  }

  updateRecords() {
    const createdDate = new Date().toISOString();
    let bodyData = {
      "event_name": this.event_name,
      "start_date": this.start_date,
      "end_date": this.end_date,
      "createdBy": `${this.firstName} ${this.lastName}`, // Corrected
      "createdDate": createdDate
    };
  }

  save() {
    if (this.currentCalendarID === '') {
      this.register();
    } else {
      this.updateRecords();
    }
  }

  getAllEvents() {
    this.http.get("http://localhost:8085/api/event_table/")
      .subscribe((resultData: any) => {
        this.EventArray = resultData.data;
      });
  }

  show() {
    this.modal.nativeElement.style.display = 'block';
  }

  closeModal() {
    this.modal.nativeElement.style.display = 'none';
    this.modalClosed.emit(); // Emit event when modal is closed
  }

  onSubmit() {
    if (!this.event_name || !this.start_date || !this.end_date) {
      this.snackBar.open('Please fill in all required fields', 'Close', {
        duration: 3000,
        panelClass: ['error-snackbar']
      });
      return;
    }
  
    // Convert string dates to Date objects
    const startDate = new Date(this.start_date);
    const endDate = new Date(this.end_date);
  
    // Check if the conversion was successful
    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
      // Handle invalid dates
      console.error('Invalid date format');
      return;
    }
  
    const createdBy = this.loggedInUser ? `${this.loggedInUser.firstName} ${this.loggedInUser.lastName}` : 'Unknown User';
    const createdDate = new Date().toISOString();
  
    this.eventAdded.emit({
      title: this.event_name,
      start: startDate.toISOString(),
      end: endDate.toISOString(),
      createdBy: createdBy,
      createdDate: createdDate
    });
    this.closeModal();
    this.save();
    this.modalClosed.emit(); // Emit event when modal is closed
  }
  
  
}
