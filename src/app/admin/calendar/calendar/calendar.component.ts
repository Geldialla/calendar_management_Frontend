import { Component, OnInit, ViewChild } from '@angular/core';
import { CalendarOptions, EventApi } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { CalendarService } from 'src/app/service/calendar/calendar.service';
import { AuthService } from 'src/app/service/auth/auth.service';
import { EventModalComponent } from '../event-modal/event-modal.component';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  @ViewChild(EventModalComponent) eventModal!: EventModalComponent;
  calendarOptions!: CalendarOptions;
  loggedInUser: any;

  constructor(
    private calendarService: CalendarService,
    private authService: AuthService,
  ) { }

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
    this.calendarService.getAllCalendar()
      .subscribe((resultData: any) => {
        const events = resultData.data.map((event: any) => ({
          id: event.id,
          title: event.event_name,
          start: event.start_date,
          end: event.end_date,
          allDay: event.all_day,
          approved: event.approved // Add approved property
        }));

        this.calendarOptions.events = events;
      });
  }

  handleDateClick(arg: { dateStr: string }): void {
    this.eventModal.eventStart = arg.dateStr;
    this.eventModal.eventEnd = '';
    this.eventModal.eventTitle = '';
    this.eventModal.show(); // Implement show method in EventModalComponent to display the modal
  }

  handleEventClick(arg: { event: { id: string; title: string; start: Date | null; end: Date | null } }): void {
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

  renderEventContent(info: { event: EventApi; timeText: string }): { html: string } {
    const title = info.event.title;
    const startTime = info.event.start ? info.event.start.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '';
    const endTime = info.event.end ? info.event.end.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '';

    let backgroundColor = '#FFA500'; // Default orange color for pending events
    if (info.event.extendedProps['approved']) {
      backgroundColor = '#32CD32'; // Green color for approved events
    } else if (info.event.extendedProps['approved'] === false) {
      backgroundColor = '#FF6347'; // Red color for declined events
    }

    return {
      html: `
        <div style="width: 100%; background: ${backgroundColor}; color: white; padding: 8px; border-radius: 5px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
          <div style="font-size: 14px; font-weight: bold;">${title}</div>
          <div style="font-size: 12px;">${startTime} - ${endTime}</div>
        </div>
      `
    };
  }

  approveEvent(currentCalendarID: string): void {
    this.calendarService.approveEvent(currentCalendarID)
      .subscribe(() => {
        console.log('Event approved successfully');
        this.refreshCalendar(); // Refresh calendar after approval
      }, error => {
        console.error('Error approving event:', error);
        // Handle error as needed
      });
  }

  addEvent(event: { title: string, start: string, end: string, createdBy: string, createdDate: string }): void {
    const newEvent = {
      title: event.title,
      start: event.start,
      end: event.end,
      createdBy: event.createdBy,
      createdDate: event.createdDate
    };

    // Implement logic to add event if needed
  }

  refreshCalendar(): void {
    this.fetchEvents(); // Fetch events again
  }

  handleModalClosed(): void {
    this.refreshCalendar(); // Refresh calendar when modal is closed
  }

  handleEventSubmitted(): void {
    this.refreshCalendar(); // Refresh calendar when event is submitted
  }
}

