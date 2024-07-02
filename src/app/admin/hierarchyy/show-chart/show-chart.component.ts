import { Component, OnInit } from '@angular/core';
import { ImageService } from 'src/app/service/images/image.service';
import { UserService } from 'src/app/service/users/users.service';

interface Employee {
last_name: any;
email: any;
  first_name: string;
  employee_role: string;
  employee_supervisor: string;
  employee_image: string;
  isVisible?: boolean;
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
  selectedUser: Employee | null = null;

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
        console.log(this.usrArr);
        this.buildHierarchy();
        this.isLoading = false;
      });
  }

  buildHierarchy() {
    let map: { [key: string]: Employee } = {};
    this.usrArr.forEach(emp => {
      map[emp.first_name] = emp;
      emp.isVisible = true;  // Initialize all employees to be visible
    });
    this.hierarchy = null;

    this.usrArr.forEach(emp => {
      if (emp.employee_role.toUpperCase() === 'CEO') {
        this.hierarchy = emp;
      } else {
        let supervisor = map[emp.employee_supervisor];
        if (supervisor) {
          supervisor.children = supervisor.children || [];
          supervisor.children.push(emp);
        }
      }
    });
    console.log(this.hierarchy);
  }

  toggleVisibility(employee: Employee, event: MouseEvent) {
    event.stopPropagation();
    employee.isVisible = !employee.isVisible;
  }

  selectUser(employee: Employee) {
    this.selectedUser = employee;
  }

  closeUserDetails() {
    this.selectedUser = null;
  }
}
