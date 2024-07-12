import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatPaginatorModule } from '@angular/material/paginator';
import { UsersComponent } from './admin/users/users.component';
import { SuperAdminPanelComponent } from './admin/super-admin-panel/super-admin-panel.component';
import { MatTreeModule } from '@angular/material/tree';
import { MatIconModule } from '@angular/material/icon';
import { RoleComponent } from './admin/role/role.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { ShowChartComponent } from './admin/hierarchyy/show-chart/show-chart.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarComponent } from './admin/calendar/calendar/calendar.component';
import { UserCalendarComponent } from './user/calendar/user-calendar/user-calendar.component';
import { UserEventModalComponent } from './user/calendar/user-event-modal/user-event-modal.component';
import { ManagerCalendarComponent } from './manager/calendar/manager-calendar/manager-calendar.component';
import { ManagerEventModalComponent } from './manager/calendar/manager-event-modal/manager-event-modal.component';
import { UserPanelComponent } from './user/user-panel/user-panel.component';
import { ManagerPanelComponent } from './manager/manager-panel/manager-panel.component';
import { ManagerHierarchyComponent } from './manager/manager-hierarchy/manager-hierarchy.component';
import { UserHierarchyComponent } from './user/user-hierarchy/user-hierarchy.component';
import { EmailSenderComponent } from './admin/email-sender/email-sender.component';
import { AddEditImageComponent } from './admin/add-edit-image/add-edit-image.component';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { ImageSelectionModalComponent } from './admin/hierarchyy/image-selection-modal/image-selection-modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MyProfileComponent } from './admin/super-admin-panel/navbarDropdown/my-profile/my-profile.component';
import { MyEventsComponent } from './admin/super-admin-panel/navbarDropdown/my-events/my-events.component';
import { ChangePassComponent } from './admin/super-admin-panel/navbarDropdown/change-pass/change-pass.component';
import { LoginComponent } from './login/login.component';
import { CalendarEventComponent } from './admin/calendar/calendar-event/calendar-event.component';
import { CalendarListComponent } from './admin/calendar/calendar-list/calendar-list.component';
import { EventModalComponent } from './admin/calendar/event-modal/event-modal.component';
import { ManagerCalendarEventComponent } from './manager/calendar/manager-calendar-event/manager-calendar-event.component';
import { MyProfileUserComponent } from './user/user-panel/navbarDropDownUser/my-profile-user/my-profile-user.component';
import { MyEventsUserComponent } from './user/user-panel/navbarDropDownUser/my-events-user/my-events-user.component';
import { ChangePassUserComponent } from './user/user-panel/navbarDropDownUser/change-pass-user/change-pass-user.component';
import { MyProfileManagerComponent } from './manager/manager-panel/navbarDropDownManager/my-profile-manager/my-profile-manager.component';
import { MyEventsManagerComponent } from './manager/manager-panel/navbarDropDownManager/my-events-manager/my-events-manager.component';
import { ChangePassManagerComponent } from './manager/manager-panel/navbarDropDownManager/change-pass-manager/change-pass-manager.component';
import { NotFoundComponent } from './404/not-found/not-found.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UsersComponent,
    SuperAdminPanelComponent,
    RoleComponent,
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
    CalendarListComponent,
    EmailSenderComponent,
    AddEditImageComponent,
    ImageSelectionModalComponent,
    MyProfileComponent,
    MyEventsComponent,
    ChangePassComponent,
    MyProfileUserComponent,
    MyEventsUserComponent,
    ChangePassUserComponent,
    MyProfileManagerComponent,
    MyEventsManagerComponent,
    ChangePassManagerComponent,
    NotFoundComponent,
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
