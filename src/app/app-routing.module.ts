import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { SuperAdminPanelComponent } from './admin/super-admin-panel/super-admin-panel.component';
import { UsersComponent } from './admin/users/users.component';
import { RoleComponent } from './admin/role/role.component';
import { ShowChartComponent } from './admin/hierarchyy/show-chart/show-chart.component';
import { CalendarComponent } from './admin/calendar/calendar/calendar.component';
import { ManagerHierarchyComponent } from './manager/manager-hierarchy/manager-hierarchy.component';
import { ManagerCalendarComponent } from './manager/calendar/manager-calendar/manager-calendar.component';
import { UserDashboardComponent } from './user/user-dashboard/user-dashboard.component';
import { ManagerPanelComponent } from './manager/manager-panel/manager-panel.component';
import { UserPanelComponent } from './user/user-panel/user-panel.component';
import { UserHierarchyComponent } from './user/user-hierarchy/user-hierarchy.component';
import { UserCalendarComponent } from './user/calendar/user-calendar/user-calendar.component';
import { UserEventModalComponent } from './user/calendar/user-event-modal/user-event-modal.component';
import { EmailSenderComponent } from './admin/email-sender/email-sender.component';
import { AddEditImageComponent } from './admin/add-edit-image/add-edit-image.component';
import { ChangePassComponent } from './admin/super-admin-panel/navbarDropdown/change-pass/change-pass.component';
import { MyEventsComponent } from './admin/super-admin-panel/navbarDropdown/my-events/my-events.component';
import { MyProfileComponent } from './admin/super-admin-panel/navbarDropdown/my-profile/my-profile.component';
import { CalendarEventComponent } from './admin/calendar/calendar-event/calendar-event.component';
import { CalendarListComponent } from './admin/calendar/calendar-list/calendar-list.component';
import { EventModalComponent } from './admin/calendar/event-modal/event-modal.component';
import { LoginComponent } from './login/login.component';
import { ManagerCalendarEventComponent } from './manager/calendar/manager-calendar-event/manager-calendar-event.component';
import { MyProfileUserComponent } from './user/user-panel/navbarDropDownUser/my-profile-user/my-profile-user.component';
import { ChangePassUserComponent } from './user/user-panel/navbarDropDownUser/change-pass-user/change-pass-user.component';
import { MyProfileManagerComponent } from './manager/manager-panel/navbarDropDownManager/my-profile-manager/my-profile-manager.component';
import { MyEventsManagerComponent } from './manager/manager-panel/navbarDropDownManager/my-events-manager/my-events-manager.component';
import { ChangePassManagerComponent } from './manager/manager-panel/navbarDropDownManager/change-pass-manager/change-pass-manager.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'Login',
    pathMatch: 'full',
  },
  {
    path: 'Login',
    component: LoginComponent,
  },
  {
    path: 'SuperAdminPanel',
    component: SuperAdminPanelComponent,
    children: [
      {
        path: 'Dashboard',
        component: DashboardComponent,
      },
      {
        path: 'Users',
        component: UsersComponent,
      },
      {
        path: 'Role',
        component: RoleComponent,
      },
      {
        path: 'Show-Hierarchy',
        component: ShowChartComponent,
      },
      {
        path: 'Calendar',
        component: CalendarComponent,
      },
      {
        path: 'Add-event',
        component: EventModalComponent,
      },
      {
        path: 'Event',
        component: CalendarEventComponent,
      },
      {
        path: 'View-Calendar',
        component: CalendarListComponent,
      },
      {
        path: 'Email',
        component: EmailSenderComponent,
      },
      {
        path: 'Library-Add',
        component: AddEditImageComponent,
      },
      {
        path: 'MyProfile',
        component: MyProfileComponent,
      },
      {
        path: 'MyEvents',
        component: MyEventsComponent,
      },
      {
        path: 'ChangePassword',
        component: ChangePassComponent,
      },
      
    ]
  },
  {
    path: 'Manager',
    component: ManagerPanelComponent,
    children: [
      {
        path: 'Hierarchy',
        component: ManagerHierarchyComponent,
      },
      {
        path: 'Calendar',
        component: ManagerCalendarComponent,
      },
      {
        path: 'Add-event',
        component: ManagerCalendarEventComponent,
      },
      {
        path: 'MyProfile',
        component: MyProfileManagerComponent,
      },
      {
        path: 'MyEvents',
        component: MyEventsManagerComponent,
      },
      {
        path: 'ChangePassword',
        component: ChangePassManagerComponent,
      },
    ]
  },
  {
    path: 'User',
    component: UserPanelComponent,
    children: [
      {
        path: 'Dashboard',
        component: UserDashboardComponent,
      },
      {
        path: 'Hierarchy',
        component: UserHierarchyComponent,
      },
      {
        path: 'Calendar',
        component: UserCalendarComponent,
      },
      {
        path: 'Add-event',
        component: UserEventModalComponent,
      },
      {
        path: 'MyProfile',
        component: MyProfileComponent,
      },
      {
        path: 'MyEvents',
        component: MyProfileUserComponent,
      },
      {
        path: 'ChangePassword',
        component: ChangePassUserComponent,
      },
    ]
  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
