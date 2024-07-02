import { Component, OnInit } from '@angular/core';
import { ImageService } from 'src/app/service/images/image.service';
import { UserService } from 'src/app/service/users/users.service';

interface Employee {
  first_name: string;
  employee_role: string;
  employee_supervisor: string;
  employee_image: string;  // New property for the image URL
  children?: Employee[];
}


@Component({
  selector: 'app-show-chart',
  templateUrl: './show-chart.component.html',
  styleUrls: ['./show-chart.component.css']
})
export class ShowChartComponent implements OnInit {
  isLoading: boolean = false;
  usrArr: Employee[] = [];
  hierarchy: Employee | null = null;
  imageBaseUrl: string = '';

  constructor(
    private userService: UserService,
    private imageService: ImageService
  ) {}

  ngOnInit(): void {
    this.fetchEmployees();
    this.imageBaseUrl = this.imageService.getImageBaseUrl();
  }

  fetchEmployees() {
    this.isLoading = true;
    this.userService.getAllUsers()
      .subscribe((resultData: any) => {
        this.usrArr = resultData.data;
        console.log(this.usrArr);  // Log fetched data
        this.buildHierarchy();
        this.isLoading = false;
      });
  }

  buildHierarchy() {
    let map: { [key: string]: Employee } = {};
    this.usrArr.forEach(emp => map[emp.first_name] = emp);
    this.hierarchy = null;

    this.usrArr.forEach(emp => {
      if (emp.employee_role.toUpperCase() === 'CEO') {  // Case-insensitive comparison
        this.hierarchy = emp;
      } else {
        let supervisor = map[emp.employee_supervisor];
        if (supervisor) {
          supervisor.children = supervisor.children || [];
          supervisor.children.push(emp);
        }
      }
    });
    console.log(this.hierarchy);  // Log hierarchy structure
  }
}