import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { CalendarOptions, EventApi } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { ManagerEventModalComponent } from '../manager-event-modal/manager-event-modal.component';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-manager-calendar',
  templateUrl: './manager-calendar.component.html',
  styleUrls: ['./manager-calendar.component.css']
})
export class ManagerCalendarComponent implements OnInit {
  @ViewChild(ManagerEventModalComponent) eventModal!: ManagerEventModalComponent;
  calendarOptions!: CalendarOptions;
  loggedInUser: any;

  constructor(private http: HttpClient, private authService: AuthService) { }
  

  ngOnInit(): void {
    this.loggedInUser = this.authService.getLoggedInUser();
    this.initializeCalendarOptions();
    this.fetchEvents();
  }

  initializeCalendarOptions(): void {
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
      eventContent: this.renderEventContent.bind(this) // Use eventContent instead of eventDidMount
    };
  }

  fetchEvents(): void {
    this.http.get("http://localhost:8085/api/calendar_event_table/")
      .subscribe((resultData: any) => {
        const events = resultData.data.map((event: any) => ({
          id: event.id, // Ensure to map the event id
          title: event.event_name,
          start: event.start_date,
          end: event.end_date,
          allDay: event.all_day // Ensure allDay is set based on the event data
        }));

        this.calendarOptions.events = events;
      });
  }

  handleDateClick(arg: { dateStr: string; }): void {
    this.eventModal.eventStart = arg.dateStr;
    this.eventModal.eventEnd = '';
    this.eventModal.eventTitle = '';
    this.eventModal.show(); // Implement show method in EventModalComponent to display the modal
  }

  handleEventClick(arg: { event: { id: string; title: string; start: Date | null; end: Date | null; }; }): void {
    const eventTitle = arg.event.title;
    const eventStart = arg.event.start ? this.formatDate(arg.event.start) : 'N/A';
    const eventEnd = arg.event.end ? this.formatDate(arg.event.end) : 'N/A'; // Check if end time exists

    const modalContent = `
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content border-0 shadow">
          <div class="modal-header bg-primary text-white border-0 d-flex justify-content-center align-items-center">
            <h4 class="modal-title mb-0">${eventTitle}</h4>
            <button type="button" class="close text-white" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <p class="mb-0"><strong>Start Time:</strong> ${eventStart}</p>
            <p class="mb-0"><strong>End Time:</strong> ${eventEnd}</p> <!-- Display end time -->
          </div>
          <div class="modal-footer border-0">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    `;

    const modalElement = document.createElement('div');
    modalElement.classList.add('modal');
    modalElement.setAttribute('tabindex', '-1');
    modalElement.setAttribute('role', 'dialog');
    modalElement.setAttribute('aria-labelledby', 'exampleModalCenterTitle');
    modalElement.setAttribute('aria-hidden', 'true');
    modalElement.innerHTML = modalContent;

    document.body.appendChild(modalElement);
    modalElement.classList.add('show');
    modalElement.style.display = 'block';

    modalElement.addEventListener('click', function () {
      modalElement.remove();
    });
  }

  formatDate(date: Date): string {
    return date.toLocaleString([], { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' });
  }

  renderEventContent(info: { event: EventApi, timeText: string }) {
    const title = info.event.title;
    const startTime = info.event.start ? info.event.start.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '';
    const endTime = info.event.end ? info.event.end.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '';

    return {
      html: `
        <div style="width: 100%; background: linear-gradient(135deg, #FF8C00, #FFA500); color: white; padding: 8px; border-radius: 5px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
    <div style="font-size: 14px; font-weight: bold;">${title}</div>
    <div style="font-size: 12px;">${startTime} - ${endTime}</div>
</div>

      `
    };
  }

  addEvent(event: { title: string, start: string, end: string, createdBy: string, createdDate: string }) {
    const newEvent = {
      title: event.title,
      start: event.start,
      end: event.end,
      createdBy: event.createdBy,
      createdDate: event.createdDate
    };
    
    console.log("Adding event:", newEvent); // Debugging log to check if it's called multiple times
    
    this.http.post("http://localhost:8085/api/calendar_event_table/add", newEvent)
      .subscribe(() => {
        this.fetchEvents(); // Refresh events after adding
      });
  }
  

  refreshCalendar(): void {
    this.fetchEvents(); // Fetch events again
  }
  

  deleteEvent(eventId: string) {
    this.http.delete(`http://localhost:8085/api/calendar_event_table/delete/${eventId}`)
      .subscribe(() => {
        this.refreshCalendar(); // Refresh events after deleting
      });
  }

  updateEvent(eventId: string, updatedEvent: { title: string, start: string, end: string, allDay: boolean }) {
    this.http.put(`http://localhost:8085/api/calendar_event_table/update/${eventId}`, updatedEvent)
      .subscribe(() => {
        this.refreshCalendar(); // Refresh events after deleting
      });
  }

  handleModalClosed(): void {
    this.refreshCalendar(); // Refresh calendar when modal is closed
  }

  handleEventSubmitted(): void {
    this.refreshCalendar(); // Refresh calendar when event is submitted
  }
}