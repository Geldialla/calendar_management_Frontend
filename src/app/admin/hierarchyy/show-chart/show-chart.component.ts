import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-show-chart',
  templateUrl: './show-chart.component.html',
  styleUrls: ['./show-chart.component.css']
})

export class ShowChartComponent {
  isLoading: boolean = false;
  empArr: any[] = [];

  constructor(private http: HttpClient) {
    this.fetchEmployees(); // Fetch employees when the component initializes
  }

  fetchEmployees() {
    this.isLoading = true;
    this.http.get("http://localhost:8085/api/hierarchy_table/") // Replace the URL with your API endpoint
      .subscribe((resultData: any) => {
        this.empArr = resultData.data;
        this.isLoading = false;
      });
  }
}
