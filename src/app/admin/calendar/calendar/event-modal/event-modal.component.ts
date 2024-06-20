import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Output, ElementRef, ViewChild, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/service/auth/auth.service';

@Component({
  selector: 'app-event-modal',
  templateUrl: './event-modal.component.html',
  styleUrls: ['./event-modal.component.css']
})
export class EventModalComponent implements OnInit {
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
  }

  ngOnInit(): void {
    this.getAllEvents();
    this.getAllCalendarEvents();
    this.getLoggedInUser();
  }

  getLoggedInUser() {
    this.firstName = localStorage.getItem('loggedInUserFirstName');
    this.lastName = localStorage.getItem('loggedInUserLastName');
    this.loggedInUser = { firstName: this.firstName, lastName: this.lastName };
    console.log('Logged in user:', this.loggedInUser);  // Debugging line
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
      "createdBy": `${this.firstName} ${this.lastName}`,
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
      "createdBy": `${this.firstName} ${this.lastName}`,
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

  sendEmail(eventData: { title: string; start: string; end: string; createdBy: string; createdDate: string }) {
    const formattedStartDate = new Date(eventData.start).toLocaleString();
    const formattedEndDate = new Date(eventData.end).toLocaleString();
    const formattedCreatedDate = new Date(eventData.createdDate).toLocaleString();
  
    const emailData = {
      email: 'geldi.alla@idracompany.com',  // You can dynamically set this or get it from user input
      subject: `New Event Created: ${eventData.title}`,
      message: `
        <p>An event has been created with the following details:</p>
        <p><strong>Title:</strong> ${eventData.title}</p>
        <p><strong>Start:</strong> ${formattedStartDate}</p>
        <p><strong>End:</strong> ${formattedEndDate}</p>
        <p><strong>Created By:</strong> ${eventData.createdBy}</p>
        <p><strong>Created Date:</strong> ${formattedCreatedDate}</p>
      `
    };
  
    this.http.post<any>('http://localhost:8085/send-email', emailData)
      .subscribe(
        response => {
          console.log('Email sent successfully:', response);
          this.snackBar.open('Email sent successfully', 'Close', {
            duration: 6000,
            panelClass: ['success-snackbar']
          });
        },
        error => {
          console.error('Error sending email:', error);
          this.snackBar.open('Error sending email', 'Close', {
            duration: 6000,
            panelClass: ['error-snackbar']
          });
        }
      );
  }
  

  onSubmit() {
    if (!this.event_name || !this.start_date || !this.end_date) {
      this.snackBar.open('Please fill in all required fields', 'Close', {
        duration: 3000,
        panelClass: ['error-snackbar']
      });
      return;
    }

    const startDate = new Date(this.start_date);
    const endDate = new Date(this.end_date);

    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
      console.error('Invalid date format');
      return;
    }

    const createdBy = this.loggedInUser ? `${this.loggedInUser.firstName} ${this.loggedInUser.lastName}` : 'Unknown User';
    const createdDate = new Date().toISOString();

    const eventData = {
      title: this.event_name,
      start: startDate.toISOString(),
      end: endDate.toISOString(),
      createdBy: createdBy,
      createdDate: createdDate
    };

    this.eventAdded.emit(eventData);
    this.closeModal();
    this.save();
    this.modalClosed.emit();

    // Send the email with event data
    this.sendEmail(eventData);
  }
}
