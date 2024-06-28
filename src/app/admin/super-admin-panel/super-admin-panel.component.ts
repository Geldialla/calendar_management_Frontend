import { Component, ElementRef, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth/auth.service';
import { WeatherService } from 'src/app/service/weather/weather.service';

declare var $: any; // Declare $ for using jQuery

@Component({
  selector: 'app-super-admin-panel',
  templateUrl: './super-admin-panel.component.html',
  styleUrls: ['./super-admin-panel.component.css']
})
export class SuperAdminPanelComponent implements OnInit {
  loggedInUser: any;
  firstName: string | null = null;
  lastName: string | null = null;
  weather: any;

  constructor(
    private elRef: ElementRef,
    private router: Router,
    private authService: AuthService,
    private weatherService: WeatherService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    // Get logged-in user information
    this.loggedInUser = this.authService.getLoggedInUser();
    this.firstName = localStorage.getItem('loggedInUserFirstName');
    this.lastName = localStorage.getItem('loggedInUserLastName');

    // jQuery code for toggling sidebar
    $(this.elRef.nativeElement).find('#sidebarCollapse').on('click', function () {
      $('#sidebar').toggleClass('active');
    });

    // Fetch weather data
    this.getWeather('Tirana, AL');
  }

  getWeather(city: string): void {
    this.weatherService.getWeather(city).subscribe(data => {
      this.weather = data;
      console.log('Weather data:', this.weather); // Debugging: Log weather data
      this.cdr.detectChanges(); // Manually trigger change detection
    }, error => {
      console.error('Error fetching weather data:', error); // Debugging: Log error if occurs
    });
  }

  logout(): void {
    // Remove first name and last name from local storage
    localStorage.removeItem('loggedInUserFirstName');
    localStorage.removeItem('loggedInUserLastName');
    // Call logout method of AuthService
    this.authService.logout();
    // Navigate to login page
    this.router.navigate(['/Login']);
  }
}
