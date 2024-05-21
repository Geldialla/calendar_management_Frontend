import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

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

  constructor(private http: HttpClient, private snackBar: MatSnackBar) {
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
      this.snackBar.open('User Registered Successfully', 'Close', {
        duration: 6000,
        panelClass: ['success-snackbar']
      });
      this.getAllUsers();
      this.clearFormData();
      this.showTable = true;
      this.updatePagedArray();
      this.showForm = false;
    }, error => {
      console.error('Error registering User:', error);
      this.snackBar.open('Error registering User. Please try again.', 'Close', {
        duration: 6000,
        panelClass: ['error-snackbar']
      });
    });
}

deleteRecord(data: any) {
  this.http.delete("http://localhost:8085/api/users_table/delete" + "/" + data.id)
    .subscribe((resultData) => {
      console.log(resultData);
      this.snackBar.open('User Deleted Successfully', 'Close', {
        duration: 6000,
        panelClass: ['success-snackbar']
      });
      this.getAllUsers();
    });
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
      this.snackBar.open('User Updated Successfully', 'Close', {
        duration: 6000,
        panelClass: ['success-snackbar']
      });
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
  this.snackBar.open('Are you sure you want to delete this user?', 'Confirm', {
    duration: 8000,
    panelClass: ['confirm-snackbar']
  }).onAction().subscribe(() => {
    this.deleteRecord(data);
  });
}

setUpdate(data: any) {
  this.first_name = data.first_name;
  this.last_name = data.last_name;
  this.email = data.email;
  this.password = data.password;
  this.phone_number = data.phone_number;
  this.country = data.country;
  this.address = data.address;
  this.status = data.status;
  this.role = data.role;
  this.currentUserID = data.id;
  // Show the form when editing
  this.showForm = true;
  this.showTable = false;
}

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
pagedUserArray: any[] = []; // Array to hold the paged items

updatePagedArray(): void {
  const startIndex = (this.pageIndex - 1) * this.pageSize;
  const endIndex = Math.min(startIndex + this.pageSize, this.UserArray.length);

  console.log("Start Index:", startIndex);
  console.log("End Index:", endIndex);
  console.log("Total Length:", this.UserArray.length);

  this.pagedUserArray = this.UserArray.slice(startIndex, endIndex);
}

pageChanged(event: any): void {
  this.pageIndex = event.pageIndex + 1; // +1 to match 1-based indexing
  this.updatePagedArray(); // Update paged array when page changes
}

}
