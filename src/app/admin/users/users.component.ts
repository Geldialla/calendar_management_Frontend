import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {
  UserArray: any[] = [];
  isResultLoaded = false;
  isUpdateFormActive = false;
  contractsCloseToCompletionCount = 0;
  expiredContracts: any[] = [];
  searchKeyword: string = '';

  first_name: string = '';
  last_name: string = '';
  email: string = '';
  password: string = '';
  phone_number: string = '';
  country: string = '';
  address: string = '';
  status: string = '';
  role: string = '';
  currentUserID = '';

  constructor(private router: Router, private http: HttpClient) {
    this.getAllUsers();
  }

  ngOnInit(): void {
    this.getAllUsers();
    this.updatePagedArray();
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


  search(): void {
    if (this.searchKeyword.trim() !== '') {
        this.pagedUserArray = this.UserArray.filter(first_name =>
          first_name.first_name.toLowerCase().includes(this.searchKeyword.toLowerCase())
        );
    } else {
        // If search keyword is empty, display all users
        this.updatePagedArray();
    }
}



  register() {
    let bodyData = {
      "first_name": this.first_name,
      "last_name": this.last_name,
      "email": this.email,
      "password": this.password,
      "phone_number": this.phone_number,
      "country": this.country,
      "address": this.address,
      "status": this.status,
      "role": this.role,
    };

    this.http.post("http://localhost:8085/api/users_table/add", bodyData)
      .pipe(
        catchError(error => {
          console.error('Error registering User:', error);
          return throwError(error);
        })
      )
      .subscribe((resultData: any) => {
        console.log(resultData);
        alert(`User Register Successfully`);
        this.getAllUsers();
        // Clear form data
        this.clearFormData();
        // Show the table
        this.showTable = true;
        // Update paged array
        this.updatePagedArray();
        // Hide the form
        this.showForm = false;
      });
  }

  setUpdate(data: any) {
    this.first_name = data.first_name;
    this.last_name = data.last_name;
    this.email = data.email;
    this.password = data.password;
    this.country = data.country;
    this.address = data.contract;
    this.status = data.status;
    this.role = data.role;

    // Convert start_date and end_date strings to Date objects
    const startDate = new Date(data.start_date);
    const endDate = new Date(data.end_date);

    // Format the dates as "yyyy-MM-dd"
    const formattedStartDate = this.formatDate(startDate);
    const formattedEndDate = this.formatDate(endDate);

    // Assign the formatted dates to the component properties

    this.currentUserID = data.id;
    // Show the form when editing
    this.showForm = true;
    this.showTable = false;
  }

  // Helper function to format date as "yyyy-MM-dd"
  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Add leading zero if needed
    const day = date.getDate().toString().padStart(2, '0'); // Add leading zero if needed

    return `${year}-${month}-${day}`;
  }



  updateRecords() {
    let bodyData = {
      "first_name": this.first_name,
      "last_name": this.last_name,
      "email": this.email,
      "password": this.password,
      "phone_number": this.phone_number,
      "country": this.country,
      "address": this.address,
      "status": this.status,
      "role": this.role,
    };

    this.http.put("http://localhost:8085/api/users_table/update" + "/" + this.currentUserID, bodyData)
      .subscribe((resultData: any) => {
        console.log(resultData);
        alert(`User Updated successfully`);
        this.getAllUsers();
        // Close the form after updating
        this.showForm = false;
      });
  }

  save() {
    if (this.currentUserID === '') {
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
    this.first_name = '';
    this.last_name = '';
    this.email = '';
    this.password = '';
    this.phone_number = '';
    this.country = '';
    this.address = '';
    this.status = '';
    this.role = '';
    this.currentUserID = '';
  }



  setDelete(data: any) {
    this.http.delete("http://localhost:8085/api/users_table/delete" + "/" + data.id)
      .subscribe((resultData) => {
        console.log(resultData);
        alert(`User Deleted Successfully`);
        this.getAllUsers();
      });
  }


  // Other component properties

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
    // Handle other go back logic if needed
  }



  // pagination

  // Inside the DashboardComponent class

  pageSize = 10; // Number of items per page
  pageIndex = 1; // Current page index
  pagedUserArray: any[] = []; // Array to hold the paged items


  // Inside the DashboardComponent class
  updatePagedArray(): void {
    const startIndex = (this.pageIndex - 1) * this.pageSize;
    const endIndex = Math.min(startIndex + this.pageSize, this.UserArray.length);

    console.log("Start Index:", startIndex);
    console.log("End Index:", endIndex);
    console.log("Total Length:", this.UserArray.length);

    this.pagedUserArray = this.UserArray.slice(startIndex, endIndex);
  }

  // Method to handle page change event
  pageChanged(event: any): void {
    this.pageIndex = event.pageIndex + 1; // +1 to match 1-based indexing
    this.updatePagedArray(); // Update paged array when page changes
  }

}
