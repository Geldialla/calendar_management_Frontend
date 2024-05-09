import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css']
})
export class RoleComponent {
  RoleArray: any[] = [];
  isResultLoaded = false;
  isUpdateFormActive = false;
  contractsCloseToCompletionCount = 0;
  expiredContracts: any[] = [];
  searchKeyword: string = '';

  user_role: string = '';
  currentRoleID = '';

  constructor(private router: Router, private http: HttpClient, private snackBar: MatSnackBar) {
    this.getAllRoles();
  }
  

  ngOnInit(): void {
    this.getAllRoles();
    this.updatePagedArray();
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
        this.pagedRoleArray = this.RoleArray.filter(user_role =>
          user_role.user_role.toLowerCase().includes(this.searchKeyword.toLowerCase())
        );
    } else {
        // If search keyword is empty, display all Roles
        this.updatePagedArray();
    }
}

register() {
  let bodyData = {
    "user_role": this.user_role,
  };

  this.http.post("http://localhost:8085/api/role_table/add", bodyData)
    .pipe(
      catchError(error => {
        console.error('Error registering Role:', error);
        return throwError(error);
      })
    )
    .subscribe((resultData: any) => {
      console.log(resultData);
      this.snackBar.open('Role Registered Successfully', 'Close', {
        duration: 6000, // Duration the snackbar should be displayed in milliseconds
        panelClass: ['success-snackbar'] // Custom CSS class for styling
      });
      this.getAllRoles();
      this.clearFormData();
      this.showTable = true;
      this.updatePagedArray();
      this.showForm = false;
    }, error => {
      console.error('Error registering Role:', error);
      this.snackBar.open('Error registering Role. Please try again.', 'Close', {
        duration: 6000,
        panelClass: ['error-snackbar']
      });
    });
}

deleteRecord(data: any) {
  this.http.delete("http://localhost:8085/api/role_table/delete" + "/" + data.id)
    .subscribe((resultData) => {
      console.log(resultData);
      this.snackBar.open('Role Deleted Successfully', 'Close', {
        duration: 6000,
        panelClass: ['success-snackbar']
      });
      this.getAllRoles();
    });
}

updateRecords() {
  let bodyData = {
    "user_role": this.user_role,
  };

  this.http.put("http://localhost:8085/api/role_table/update" + "/" + this.currentRoleID, bodyData)
    .subscribe((resultData: any) => {
      console.log(resultData);
      this.snackBar.open('Role Updated successfully', 'Close', {
        duration: 6000,
        panelClass: ['success-snackbar']
      });
      this.getAllRoles();
      // Close the form after updating
      this.showForm = false;
    });
}

save() {
  if (this.currentRoleID === '') {
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
  this.user_role = '';
  this.currentRoleID = '';
}

setDelete(data: any) {
  this.snackBar.open('Are you sure you want to delete this role?', 'Confirm', {
    duration: 6000,
    panelClass: ['confirm-snackbar']
  }).onAction().subscribe(() => {
    this.deleteRecord(data);
  });
}

setUpdate(data: any) {
  this.user_role = data.user_role;

  // Convert start_date and end_date strings to Date objects
  const startDate = new Date(data.start_date);
  const endDate = new Date(data.end_date);

  // Format the dates as "yyyy-MM-dd"
  const formattedStartDate = this.formatDate(startDate);
  const formattedEndDate = this.formatDate(endDate);

  // Assign the formatted dates to the component properties

  this.currentRoleID = data.id;
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
}

// pagination

pageSize = 10; // Number of items per page
pageIndex = 1; // Current page index
pagedRoleArray: any[] = []; // Array to hold the paged items

updatePagedArray(): void {
  const startIndex = (this.pageIndex - 1) * this.pageSize;
  const endIndex = Math.min(startIndex + this.pageSize, this.RoleArray.length);

  console.log("Start Index:", startIndex);
  console.log("End Index:", endIndex);
  console.log("Total Length:", this.RoleArray.length);

  this.pagedRoleArray = this.RoleArray.slice(startIndex, endIndex);
}

pageChanged(event: any): void {
  this.pageIndex = event.pageIndex + 1; // +1 to match 1-based indexing
  this.updatePagedArray(); // Update paged array when page changes
}

}
