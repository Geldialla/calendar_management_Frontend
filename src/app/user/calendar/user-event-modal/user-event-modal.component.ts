import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-user-event-modal',
  templateUrl: './user-event-modal.component.html',
  styleUrls: ['./user-event-modal.component.css']
})
export class UserEventModalComponent{
  @ViewChild('modal') modal!: ElementRef;

  eventTitle: string = '';
  eventStart: string = '';
  eventEnd: string = '';

  @Output() eventAdded = new EventEmitter<{ title: string, start: string, end: string }>();

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
