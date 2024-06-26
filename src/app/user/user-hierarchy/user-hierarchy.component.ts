import { Component, OnInit } from '@angular/core';
import { HierarchyyService } from 'src/app/service/hierarchyy/hierarchyy.service';

interface Employee {
  employee_name: string;
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
  empArr: Employee[] = [];
  hierarchy: Employee | null = null;

  constructor(
    private hierarchyyService: HierarchyyService
  ) { }

  ngOnInit(): void {
    this.fetchEmployees();
  }

  fetchEmployees() {
    this.isLoading = true;
    this.hierarchyyService.getAllHierarchyy()
      .subscribe((resultData: any) => {
        this.empArr = resultData.data;
        console.log(this.empArr);  // Log fetched data
        this.buildHierarchy();
        this.isLoading = false;
      });
  }

  buildHierarchy() {
    let map: { [key: string]: Employee } = {};
    this.empArr.forEach(emp => map[emp.employee_name] = emp);
    this.hierarchy = null;

    this.empArr.forEach(emp => {
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

  findSupervisor(employeeName: string): Employee | null {
    const employee = this.empArr.find(emp => emp.employee_name === employeeName);
    if (!employee) {
      return null;
    }
    return this.empArr.find(emp => emp.employee_name === employee.employee_supervisor) || null;
  }

}