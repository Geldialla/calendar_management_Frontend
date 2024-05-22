import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-add-chart',
  templateUrl: './add-chart.component.html',
  styleUrls: ['./add-chart.component.css']
})
export class AddChartComponent {
  HierarchyArray: any[] = [];
  UserArray: any[] = [];
  RoleArray: any[] = [];
  isResultLoaded = false;
  isUpdateFormActive = false;
  searchKeyword: string = '';

  employee_name: string = '';
  employee_role: string = '';
  employee_supervisor: string = '';
  employee_image: string = '';
  currentHierarchyID = '';

  constructor(private http: HttpClient, private snackBar: MatSnackBar) {
    this.getAllHierarchy();
    this.getAllRoles();
    this.getAllUsers();
  }


  ngOnInit(): void {
    this.getAllHierarchy();
    this.updatePagedArray();
    this.getAllRoles();
    this.getAllUsers();
  }

  getAllHierarchy() {
    this.http.get("http://localhost:8085/api/hierarchy_table/")
      .subscribe((resultData: any) => {
        this.isResultLoaded = true;
        console.log(resultData.data);
        this.HierarchyArray = resultData.data;
        this.updatePagedArray();
      });
  }

  getAllUsers() {
    this.http.get("http://localhost:8085/api/users_table/")
      .subscribe((resultData: any) => {
        this.isResultLoaded = true;
        console.log(resultData.data);
        this.UserArray = resultData.data;
        this.updatePagedArray();
      });
  }

  getAllRoles() {
    this.http.get("http://localhost:8085/api/role_table/")
      .subscribe((resultData: any) => {
        this.isResultLoaded = true;
        console.log(resultData.data);
        this.RoleArray = resultData.data;
        this.updatePagedArray();
      });
  }

  search(): void {
    if (this.searchKeyword.trim() !== '') {
      this.pagedHierarchyArray = this.HierarchyArray.filter(employee_name =>
        employee_name.employee_name.toLowerCase().includes(this.searchKeyword.toLowerCase())
      );
    } else {
      // If search keyword is empty, display all Employee
      this.updatePagedArray();
    }
  }

  register() {
    let bodyData = {
      "employee_name": this.employee_name,
      "employee_role": this.employee_role,
      "employee_supervisor": this.employee_supervisor,
      "employee_image": this.employee_image,
    };

    this.http.post("http://localhost:8085/api/hierarchy_table/add", bodyData)
      .pipe(
        catchError(error => {
          console.error('Error registering Employee:', error);
          return throwError(error);
        })
      )
      .subscribe((resultData: any) => {
        console.log(resultData);
        this.snackBar.open('Employee Registered Successfully', 'Close', {
          duration: 6000, // Duration the snackbar should be displayed in milliseconds
          panelClass: ['success-snackbar'] // Custom CSS class for styling
        });
        this.getAllHierarchy();
        this.clearFormData();
        this.showTable = true;
        this.updatePagedArray();
        this.showForm = false;
      }, error => {
        console.error('Error registering Employee:', error);
        this.snackBar.open('Error registering Employee. Please try again.', 'Close', {
          duration: 6000,
          panelClass: ['error-snackbar']
        });
      });
  }

  deleteRecord(data: any) {
    this.http.delete("http://localhost:8085/api/hierarchy_table/delete" + "/" + data.id)
      .subscribe((resultData) => {
        console.log(resultData);
        this.snackBar.open('v Deleted Successfully', 'Close', {
          duration: 6000,
          panelClass: ['success-snackbar']
        });
        this.getAllHierarchy();
      });
  }

  updateRecords() {
    let bodyData = {
      "employee_name": this.employee_name,
      "employee_role": this.employee_role,
      "employee_supervisor": this.employee_supervisor,
      "employee_image": this.employee_image,
    };

    this.http.put("http://localhost:8085/api/hierarchy_table/update" + "/" + this.currentHierarchyID, bodyData)
      .subscribe((resultData: any) => {
        console.log(resultData);
        this.snackBar.open('Employee Updated successfully', 'Close', {
          duration: 6000,
          panelClass: ['success-snackbar']
        });
        this.getAllHierarchy();
        // Close the form after updating
        this.showForm = false;
      });
  }

  save() {
    if (this.currentHierarchyID === '') {
      this.register();
    } else {
      this.updateRecords();
    }
    // Clear form data
    this.clearFormData();
    // Show the table
    this.showTable = true;
    // Update paged array
    this.updatePagedArray();
  }

  clearFormData() {
    this.employee_name = '';
    this.employee_role = '';
    this.employee_supervisor = '';
    this.employee_image = '';
    this.currentHierarchyID = '';
  }

  setDelete(data: any) {
    this.snackBar.open('Are you sure you want to delete this Employee?', 'Confirm', {
      duration: 6000,
      panelClass: ['confirm-snackbar']
    }).onAction().subscribe(() => {
      this.deleteRecord(data);
    });
  }

  setUpdate(data: any) {
    this.employee_name = data.employee_name;
    this.employee_role = data.employee_role;
    this.employee_supervisor = data.employee_supervisor;
    this.employee_image = data.employee_image;
    this.currentHierarchyID = data.id;
    // Show the form when editing
    this.showForm = true;
    this.showTable = false;
  }

  // Helper function to format date as "yyyy-MM-dd"

  showForm: boolean = false;
  showTable: boolean = true;

  // Method to toggle the visibility of the form
  toggleFormVisibility() {
    this.showForm = !this.showForm; // Toggle the form visibility
    this.showTable = false; // Ensure the table is hidden when showing the form
  }

  // Method to close the form
  closeForm() {
    this.showForm = false;
  }

  // Method to handle going back
  goBack() {
    // Close the form when going back
    this.closeForm();
    // Clear form data
    this.clearFormData();
    // Show the table
    this.showTable = true;
    // Update paged array
    this.updatePagedArray();
  }

  // pagination

  pageSize = 10; // Number of items per page
  pageIndex = 1; // Current page index
  pagedHierarchyArray: any[] = []; // Array to hold the paged items

  updatePagedArray(): void {
    const startIndex = (this.pageIndex - 1) * this.pageSize;
    const endIndex = Math.min(startIndex + this.pageSize, this.HierarchyArray.length);

    console.log("Start Index:", startIndex);
    console.log("End Index:", endIndex);
    console.log("Total Length:", this.HierarchyArray.length);

    this.pagedHierarchyArray = this.HierarchyArray.slice(startIndex, endIndex);
  }

  pageChanged(event: any): void {
    this.pageIndex = event.pageIndex + 1; // +1 to match 1-based indexing
    this.updatePagedArray(); // Update paged array when page changes
  }

}
