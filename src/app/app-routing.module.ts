import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login/login.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { SuperAdminPanelComponent } from './admin/super-admin-panel/super-admin-panel.component';
import { UsersComponent } from './admin/users/users.component';
import { RoleComponent } from './admin/role/role.component';
import { AddChartComponent } from './admin/hierarchyy/add-chart/add-chart.component';
import { ShowChartComponent } from './admin/hierarchyy/show-chart/show-chart.component';
import { EventModalComponent } from './admin/calendar/calendar/event-modal/event-modal.component';
import { CalendarComponent } from './admin/calendar/calendar/calendar.component';
import { CalendarEventComponent } from './admin/calendar-event/calendar-event.component';
import { ManagerHierarchyComponent } from './manager/manager-hierarchy/manager-hierarchy.component';
import { ManagerCalendarComponent } from './manager/calendar/manager-calendar/manager-calendar.component';
import { UserDashboardComponent } from './user/user-dashboard/user-dashboard.component';
import { ManagerPanelComponent } from './manager/manager-panel/manager-panel.component';
import { UserPanelComponent } from './user/user-panel/user-panel.component';
import { UserHierarchyComponent } from './user/user-hierarchy/user-hierarchy.component';
import { UserCalendarComponent } from './user/calendar/user-calendar/user-calendar.component';
import { UserEventModalComponent } from './user/calendar/user-event-modal/user-event-modal.component';
import { CalendarListComponent } from './admin/calendar/calendar/calendar-list/calendar-list.component';
import { ManagerCalendarEventComponent } from './manager/calendar/manager-calendar/manager-calendar-event/manager-calendar-event.component';

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
        path: 'Add-Hierarchy',
        component: AddChartComponent,
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
    ]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
