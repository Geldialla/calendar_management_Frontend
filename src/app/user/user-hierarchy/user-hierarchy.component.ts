import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/users/users.service';

interface Employee {
  first_name: string;
  employee_role: string;
  employee_supervisor: string;
  employee_image: string;  // New property for the image URL
  children?: Employee[];
}

@Component({
  selector: 'app-user-hierarchy',
  templateUrl: './user-hierarchy.component.html',
  styleUrls: ['./user-hierarchy.component.css']
})
export class UserHierarchyComponent implements OnInit {
  isLoading: boolean = false;
  usrArr: Employee[] = [];
  hierarchy: Employee | null = null;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.fetchEmployees();
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