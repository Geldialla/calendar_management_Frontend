import { Component, OnInit, ViewChild } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { EventModalComponent } from '../event-modal/event-modal.component';
@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  @ViewChild(EventModalComponent) eventModal!: EventModalComponent;
  calendarOptions!: CalendarOptions;

  constructor() {}

  ngOnInit(): void {
    const date = new Date();
    const d = date.getDate();
    const m = date.getMonth();
    const y = date.getFullYear();

    this.calendarOptions = {
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

  handleDateClick(arg: { dateStr: string; }) {
    this.eventModal.eventStart = arg.dateStr;
    this.eventModal.eventEnd = '';
    this.eventModal.eventTitle = '';
    this.eventModal.show(); // Implement show method in EventModalComponent to display the modal
  }

  handleEventClick(arg: { event: { title: string; }; }) {
    alert('Event clicked: ' + arg.event.title);
  }

  addEvent(event: { title: string, start: string, end: string }) {
    this.calendarOptions.events = [...(this.calendarOptions.events as any), {
      title: event.title,
      start: event.start,
      end: event.end
    }];
  }
}
