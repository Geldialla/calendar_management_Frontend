import { Component, OnInit, ViewChild } from '@angular/core';
import { CalendarOptions, EventApi } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { EventModalComponent } from './event-modal/event-modal.component';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  @ViewChild(EventModalComponent) eventModal!: EventModalComponent;
  calendarOptions!: CalendarOptions;
  calendarComponent: any;

  constructor(private http: HttpClient, private authService: AuthService) { }

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
      events: [],
      dateClick: this.handleDateClick.bind(this),
      eventClick: this.handleEventClick.bind(this),
      eventDidMount: this.handleEventMount.bind(this) // Use eventDidMount instead of eventRender
    };

    // Fetch events from the backend
    this.http.get("http://localhost:8085/api/calendar_event_table/")
      .subscribe((resultData: any) => {
        // Convert the backend data to FullCalendar event format
        const events = resultData.data.map((event: any) => ({
          title: event.event_name,
          start: event.start_date,
          end: event.end_date,
          allDay: true // Ensure allDay is set to true for single-day events
        }));

        // Add the fetched events to the calendar options
        this.calendarOptions.events = events;
      });
  }

  refreshCalendar() {
    // Fetch events from the backend
    this.http.get("http://localhost:8085/api/calendar_event_table/")
      .subscribe((resultData: any) => {
        // Convert the backend data to FullCalendar event format
        const events = resultData.data.map((event: any) => ({
          title: event.event_name,
          start: event.start_date,
          end: event.end_date,
          allDay: true // Ensure allDay is set to true for single-day events
        }));
  
        // Update the events in the calendar options
        this.calendarOptions.events = events;
  
        // Refetch the events and render them on the calendar
        const calendarApi = this.calendarComponent.getApi();
        calendarApi.removeAllEvents(); // Remove all existing events from the calendar
        calendarApi.addEventSource(events); // Add the updated events to the calendar
      });
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

  handleEventMount(info: { event: EventApi; el: HTMLElement; }) {
    const title = info.event.title;
    const startTime = info.event.start ? info.event.start.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '';
    const endTime = info.event.end ? info.event.end.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '';

    const element = info.el;
    element.innerHTML = `
      <div class="fc-content" style="background-color: orange; color: white;">
        <span class="fc-time">${startTime} - ${endTime}</span>
        <span class="fc-title">${title}</span>
      </div>
    `;
  }

  addEvent(event: { title: string, start: string, end: string, createdBy: string, createdDate: string }) {
    this.calendarOptions.events = [...(this.calendarOptions.events as any), {
      title: event.title,
      start: event.start,
      end: event.end,
      createdBy: event.createdBy,
      createdDate: event.createdDate
    }];
  }
}
