import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Output, ElementRef, ViewChild, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CalendarService } from 'src/app/service/calendar/calendar.service';
import { EmailService } from 'src/app/service/email/email.service';
import { EventService } from 'src/app/service/events/event.service';

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

  constructor(private http: HttpClient, private snackBar: MatSnackBar, private calendarService: CalendarService,private eventService : EventService, private emailService: EmailService) {
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

  getAllCalendarEvents(): void {
    this.calendarService.getAllCalendar()
      .subscribe((resultData: any) => {
        this.isResultLoaded = true;
        this.CalendarArray = resultData.data;
      });
  }

  register() {
    const createdDate = new Date().toISOString();
  
    // Parse start_date and end_date into Date objects
    const startDate = new Date(this.start_date as Date);
    const endDate = new Date(this.end_date as Date);
  
    let bodyData = {
      "event_name": this.event_name,
      "start_date": startDate,
      "end_date": endDate,
      "createdBy": `${this.firstName} ${this.lastName}`,
      "createdDate": createdDate,
      "approved": "waiting"  // Set approved to "waiting"
    };
  
    this.calendarService.addCalendar(bodyData)
      .subscribe((resultData: any) => {
        if (resultData.status) {
          this.snackBar.open('Event Registered Successfully', 'Close', {
            duration: 6000,
            panelClass: ['success-snackbar']
          });
          this.getAllCalendarEvents();
  
          // Transform bodyData to match the expected type
          const emailData = {
            title: bodyData.event_name,
            start: startDate.toISOString(),
            end: endDate.toISOString(),
            createdBy: bodyData.createdBy,
            createdDate: bodyData.createdDate,
            eventId: resultData.eventId
          };
  
          // Send the email with event data and event ID
          this.sendEmail(emailData);
        } else {
          this.snackBar.open('Failed to register event', 'Close', {
            duration: 6000,
            panelClass: ['error-snackbar']
          });
        }
      },
      (error) => {
        console.error('Error registering event:', error);
        this.snackBar.open('Failed to register event', 'Close', {
          duration: 6000,
          panelClass: ['error-snackbar']
        });
      });
  }
  

  deleteRecord(data: any) {
    this.calendarService.deleteCalendar(data.id)
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
    this.eventService.getAllEvents()
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

  sendEmail(eventData: { title: string; start: string; end: string; createdBy: string; createdDate: string; eventId: number }) {
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
        <br>`,
      eventId: eventData.eventId  // Include eventId
    };
  
    // Call sendEmailVerification with all required parameters
    this.emailService.sendEmailVerification(
      emailData.email,
      emailData.subject,
      emailData.message,
      emailData.eventId
    ).subscribe(
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
  }
}
