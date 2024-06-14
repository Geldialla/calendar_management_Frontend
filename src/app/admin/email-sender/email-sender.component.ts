import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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

  constructor(private http: HttpClient) {}

  sendEmail() {
    const emailData = {
      email: this.email,
      subject: this.subject,
      message: this.message
    };

    this.http.post<any>('http://localhost:8085/send-email', emailData)
      .subscribe(
        response => {
          console.log('Email sent successfully:', response);
          this.responseMessage = response.message;
        },
        error => {
          console.error('Error sending email:', error);
          this.responseMessage = `Error: ${error.message}`;
        }
      );
  }
}
