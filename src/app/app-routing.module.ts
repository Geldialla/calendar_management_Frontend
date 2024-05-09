import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login/login.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { SuperAdminPanelComponent } from './admin/super-admin-panel/super-admin-panel.component';
import { UsersComponent } from './admin/users/users.component';
import { HierarchyComponent } from './admin/hierarchy/hierarchy.component';
import { RoleComponent } from './admin/role/role.component';

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
        path: 'Hierarchy',
        component: HierarchyComponent,
      },
      {
        path: 'Users',
        component: UsersComponent,
      },
      {
        path: 'Role',
        component: RoleComponent,
      }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
