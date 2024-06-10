// event-modal.component.ts
import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Output, ElementRef, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-event-modal',
  templateUrl: './event-modal.component.html',
  styleUrls: ['./event-modal.component.css']
})
export class EventModalComponent {
  CalendarArray: any[] = [];
  isResultLoaded = false;
  isUpdateFormActive = false;
  loggedInUser: any;

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

  constructor(private http: HttpClient, private snackBar: MatSnackBar, private authService: AuthService) {
    this.getAllEvents();
    this.getAllCalendarEvents();
    this.loggedInUser = this.authService.getLoggedInUser();
  }

  ngOnInit(): void {
    this.getAllEvents();
    this.getAllCalendarEvents();
    this.loggedInUser = this.authService.getLoggedInUser();
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
      "createdBy": `${this.loggedInUser.first_name} ${this.loggedInUser.last_name}`,
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
      "createdBy": `${this.loggedInUser.first_name} ${this.loggedInUser.last_name}`,
      "createdDate": createdDate
    };

    // Implement update logic here
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
  }

  onSubmit() {
    const loggedInUser = this.authService.getLoggedInUser();
    const createdDate = new Date().toISOString();

    this.eventAdded.emit({
      title: this.eventTitle,
      start: this.eventStart,
      end: this.eventEnd,
      createdBy: `${loggedInUser.first_name} ${loggedInUser.last_name}`,
      createdDate: createdDate
    });
    this.closeModal();
    this.save();
  }
}
