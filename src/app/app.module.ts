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
import { HierarchyComponent } from './admin/hierarchy/hierarchy.component';
import { UsersComponent } from './admin/users/users.component';
import { SuperAdminPanelComponent } from './admin/super-admin-panel/super-admin-panel.component';
import { MatTreeModule } from '@angular/material/tree';
import { MatIconModule } from '@angular/material/icon';
import { RoleComponent } from './admin/role/role.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AddChartComponent } from './admin/hierarchyy/add-chart/add-chart.component';
import { CommonModule } from '@angular/common';
import { ShowChartComponent } from './admin/hierarchyy/show-chart/show-chart.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    HierarchyComponent,
    UsersComponent,
    SuperAdminPanelComponent,
    RoleComponent,
    AddChartComponent,
    ShowChartComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule ,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatPaginatorModule,
    MatTreeModule,
    MatIconModule,
    MatSnackBarModule ,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  

}
