import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { UserEventModalComponent } from '../user-event-modal/user-event-modal.component';

@Component({
  selector: 'app-user-calendar',
  templateUrl: './user-calendar.component.html',
  styleUrls: ['./user-calendar.component.css']
})
export class UserCalendarComponent implements OnInit, AfterViewInit {

  @ViewChild(UserEventModalComponent) eventModal!: UserEventModalComponent;
  UserCalendarOptions!: CalendarOptions;

  constructor() {}

  ngOnInit(): void {
    const date = new Date();
    const d = date.getDate();
    const m = date.getMonth();
    const y = date.getFullYear();

    this.UserCalendarOptions = {
      plugins: [dayGridPlugin, interactionPlugin],
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,dayGridWeek,dayGridDay'
      },
      editable: true,
      selectable: true,
      events: [
        // predefined events
      ],
      dateClick: this.handleDateClick.bind(this),
      eventClick: this.handleEventClick.bind(this)
    };
  }

  ngAfterViewInit(): void {
    // Now the eventModal reference should be available
    console.log('Event Modal:', this.eventModal);
  }

  handleDateClick(arg: { dateStr: string; }) {
    console.log('Date clicked:', arg.dateStr);
    this.eventModal.eventStart = arg.dateStr;
    this.eventModal.eventEnd = '';
    this.eventModal.eventTitle = '';
    this.eventModal.show(); // Implement show method in EventModalComponent to display the modal
  }

  handleEventClick(arg: { event: { title: string; }; }) {
    alert('Event clicked: ' + arg.event.title);
  }

  addEvent(event: { title: string, start: string, end: string }) {
    this.UserCalendarOptions.events = [...(this.UserCalendarOptions.events as any), {
      title: event.title,
      start: event.start,
      end: event.end
    }];
  }
}
