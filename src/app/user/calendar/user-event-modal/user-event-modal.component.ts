import { Component, EventEmitter, Output, ElementRef, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-event-modal',
  templateUrl: './user-event-modal.component.html',
  styleUrls: ['./user-event-modal.component.css']
})
export class UserEventModalComponent {
  UserEventArray: any[] = [];
  eventTitle: string = '';
  eventStart: string = '';
  eventEnd: string = '';

  @ViewChild('modal') modal!: ElementRef;
  @Output() eventAdded = new EventEmitter<{ title: string, start: string, end: string }>();

  constructor(private http: HttpClient, private snackBar: MatSnackBar) {
    this.getAllEvents();
  }

  ngOnInit(): void {
    this.getAllEvents();
  }

  getAllEvents() {
    this.http.get("http://localhost:8085/api/event_table/")
      .subscribe((resultData: any) => {
        console.log(resultData.data);
        this.UserEventArray = resultData.data;
      });
  }

  show() {
    this.modal.nativeElement.style.display = 'block';
  }

  closeModal() {
    this.modal.nativeElement.style.display = 'none';
  }

  onSubmit() {
    this.eventAdded.emit({
      title: this.eventTitle,
      start: this.eventStart,
      end: this.eventEnd
    });
    this.closeModal();
  }
}
