import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatPaginatorModule } from '@angular/material/paginator';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { UsersComponent } from './admin/users/users.component';
import { SuperAdminPanelComponent } from './admin/super-admin-panel/super-admin-panel.component';
import { MatTreeModule } from '@angular/material/tree';
import { MatIconModule } from '@angular/material/icon';
import { RoleComponent } from './admin/role/role.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AddChartComponent } from './admin/hierarchyy/add-chart/add-chart.component';
import { CommonModule } from '@angular/common';
import { ShowChartComponent } from './admin/hierarchyy/show-chart/show-chart.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { EventModalComponent } from './admin/calendar/calendar/event-modal/event-modal.component';
import { CalendarComponent } from './admin/calendar/calendar/calendar.component';
import { CalendarEventComponent } from './admin/calendar-event/calendar-event.component';
import { UserCalendarComponent } from './user/calendar/user-calendar/user-calendar.component';
import { UserEventModalComponent } from './user/calendar/user-event-modal/user-event-modal.component';
import { ManagerCalendarComponent } from './manager/calendar/manager-calendar/manager-calendar.component';
import { ManagerEventModalComponent } from './manager/calendar/manager-event-modal/manager-event-modal.component';
import { ManagerCalendarEventComponent } from './manager/calendar/manager-calendar/manager-calendar-event/manager-calendar-event.component';
import { UserPanelComponent } from './user/user-panel/user-panel.component';
import { ManagerPanelComponent } from './manager/manager-panel/manager-panel.component';
import { ManagerHierarchyComponent } from './manager/manager-hierarchy/manager-hierarchy.component';
import { UserHierarchyComponent } from './user/user-hierarchy/user-hierarchy.component';
import { ManagerDashboardComponent } from './manager/manager-dashboard/manager-dashboard.component';
import { UserDashboardComponent } from './user/user-dashboard/user-dashboard.component';
import { CalendarListComponent } from './admin/calendar/calendar/calendar-list/calendar-list.component';
import { EmailSenderComponent } from './admin/email-sender/email-sender.component';
import { AddEditImageComponent } from './admin/add-edit-image/add-edit-image.component';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { ImageSelectionModalComponent } from './admin/add-edit-image/image-selection-modal/image-selection-modal.component';
import { MatDialogModule } from '@angular/material/dialog';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    UsersComponent,
    SuperAdminPanelComponent,
    RoleComponent,
    AddChartComponent,
    ShowChartComponent,
    EventModalComponent,
    CalendarComponent,
    CalendarEventComponent,
    UserCalendarComponent,
    UserEventModalComponent,
    ManagerCalendarComponent,
    ManagerEventModalComponent,
    ManagerCalendarEventComponent,
    UserPanelComponent,
    ManagerPanelComponent,
    ManagerHierarchyComponent,
    UserHierarchyComponent,
    ManagerDashboardComponent,
    UserDashboardComponent,
    CalendarListComponent,
    EmailSenderComponent,
    AddEditImageComponent,
    ImageSelectionModalComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatPaginatorModule,
    MatTreeModule,
    MatIconModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    FullCalendarModule, 
    BrowserAnimationsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
  ],
  
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
