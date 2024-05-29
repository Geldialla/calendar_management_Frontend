import { Component, EventEmitter, Output, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-event-modal',
  templateUrl: './event-modal.component.html',
  styleUrls: ['./event-modal.component.css']
})
export class EventModalComponent {
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
