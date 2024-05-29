import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login/login.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { SuperAdminPanelComponent } from './admin/super-admin-panel/super-admin-panel.component';
import { UsersComponent } from './admin/users/users.component';
import { RoleComponent } from './admin/role/role.component';
import { AddChartComponent } from './admin/hierarchyy/add-chart/add-chart.component';
import { ShowChartComponent } from './admin/hierarchyy/show-chart/show-chart.component';
import { EventModalComponent } from './admin/calendar/event-modal/event-modal.component';
import { CalendarComponent } from './admin/calendar/calendar/calendar.component';
import { CalendarEventComponent } from './admin/calendar/calendar/calendar-event/calendar-event.component';

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
    ]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
