import { Component, OnInit, ViewChild } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { ManagerEventModalComponent } from '../manager-event-modal/manager-event-modal.component';

@Component({
  selector: 'app-manager-calendar',
  templateUrl: './manager-calendar.component.html',
  styleUrls: ['./manager-calendar.component.css']
})
export class ManagerCalendarComponent implements OnInit {

  @ViewChild(ManagerEventModalComponent) eventModal!: ManagerEventModalComponent;
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
