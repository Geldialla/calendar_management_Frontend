import { Component } from '@angular/core';
import { EmailService } from 'src/app/service/email/email.service';

@Component({
  selector: 'app-email-sender',
  templateUrl: './email-sender.component.html',
  styleUrls: ['./email-sender.component.css']
})
export class EmailSenderComponent {
  email: string = '';
  subject: string = '';
  message: string = '';
  responseMessage: string = '';
  eventId: number = 1; // Example event ID

  constructor(private emailService: EmailService) { }

  sendEmail(): void {
    this.emailService.sendEmail(this.email, this.subject, this.message, this.eventId)
      .subscribe(
        response => {
          console.log('Email sent successfully:', response);
          this.responseMessage = 'Email sent successfully';
          // Handle success message or further actions if needed
        },
        error => {
          console.error('Error sending email:', error);
          this.responseMessage = 'Error sending email';
          // Handle error message or display to user
        }
      );
  }
}
