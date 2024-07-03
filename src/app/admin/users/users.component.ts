import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ImageService } from 'src/app/service/images/image.service';
import { RolesService } from 'src/app/service/roles/roles.service';
import { UserService } from 'src/app/service/users/users.service';
import { ImageSelectionModalComponent } from '../hierarchyy/image-selection-modal/image-selection-modal.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
[x: string]: any;

  UserArray: any[] = [];
  RoleArray: any[] = [];
  isResultLoaded = false;
  searchKeyword: string = '';

  first_name: string = '';
  last_name: string = '';
  email: string = '';
  password: string = '';
  phone_number: string = '';
  status: boolean = true;
  role: string = '';
  employee_role: string = '';
  employee_supervisor: string = '';
  employee_image: string = '';
  currentUserID = '';
  imageBaseUrl: string = '';

  showForm: boolean = false;
  showTable: boolean = true;

  pageSize = 10; // Number of items per page
  pageIndex = 1; // Current page index
  pagedUserArray: any[] = []; // Array to hold the paged items

  constructor(
    private userService: UserService,
    private snackBar: MatSnackBar,
    private imageService: ImageService,
    private roleServise: RolesService,
    public dialog: MatDialog,
  ) {
    this.getAllRoles();
    this.getAllUsers();
  }

  ngOnInit(): void {
    this.imageBaseUrl = this.imageService.getImageBaseUrl();
    this.getAllUsers();
    this.getAllRoles();
    this.updatePagedArray();
  }

  getAllUsers() {
    this.userService.getAllUsers()
      .subscribe(
        (resultData: any) => {
          this.isResultLoaded = true;
          console.log(resultData.data);
          this.UserArray = resultData.data;
          this.updatePagedArray();
        },
        error => {
          console.error('Error fetching users:', error);
        }
      );
  }

  getAllRoles() {
    this.roleServise.getAllRoles()
      .subscribe((resultData: any) => {
        this.isResultLoaded = true;
        this.RoleArray = resultData.data;
        this.updatePagedArray();
      });
  }

  search(): void {
    if (this.searchKeyword.trim() !== '') {
      this.pagedUserArray = this.UserArray.filter(user =>
        user.first_name.toLowerCase().includes(this.searchKeyword.toLowerCase())
      );
    } else {
      this.updatePagedArray();
    }
  }

  register() {
    let user = {
      "first_name": this.first_name,
      "last_name": this.last_name,
      "email": this.email,
      "password": this.password,
      "phone_number": this.phone_number,
      "status": this.status,
      "role": this.role,
      "employee_role": this.employee_role,
      "employee_supervisor": this.employee_supervisor,
      "employee_image": this.employee_image,
      
    };

    this.userService.addUser(user)
      .subscribe(
        (resultData: any) => {
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
        },
        error => {
          console.error('Error registering User:', error);
          this.snackBar.open('Error registering User. Please try again.', 'Close', {
            duration: 6000,
            panelClass: ['error-snackbar']
          });
        }
      );
  }

  deleteRecord(user: any) {
    this.userService.deleteUser(user.id)
      .subscribe(
        () => {
          this.snackBar.open('User Deleted Successfully', 'Close', {
            duration: 6000,
            panelClass: ['success-snackbar']
          });
          this.getAllUsers();
        },
        error => {
          console.error('Error deleting User:', error);
        }
      );
  }

  updateRecords() {
    let user = {
      "first_name": this.first_name,
      "last_name": this.last_name,
      "email": this.email,
      "password": this.password,
      "phone_number": this.phone_number,
      "status": this.status,
      "role": this.role,
      "employee_role": this.employee_role,
      "employee_supervisor": this.employee_supervisor,
      "employee_image": this.employee_image,
    };

    this.userService.updateUser(this.currentUserID, user)
      .subscribe(
        (resultData: any) => {
          console.log(resultData);
          this.snackBar.open('User Updated Successfully', 'Close', {
            duration: 6000,
            panelClass: ['success-snackbar']
          });
          this.getAllUsers();
          this.showForm = false;
        },
        error => {
          console.error('Error updating User:', error);
        }
      );
  }

  save() {
    if (this.currentUserID === '') {
      this.register();
    } else {
      this.updateRecords();
    }
    this.clearFormData();
    this.showTable = true;
    this.updatePagedArray();
  }

  clearFormData() {
    this.first_name = '';
    this.last_name = '';
    this.email = '';
    this.password = '';
    this.phone_number = '';
    this.status = false;
    this.role = '';
    this.employee_role = '';
    this.employee_supervisor = '';
    this.employee_image = '';
    this.currentUserID = '';
  }

  setDelete(user: any) {
    this.snackBar.open('Are you sure you want to delete this user?', 'Confirm', {
      duration: 8000,
      panelClass: ['confirm-snackbar']
    }).onAction().subscribe(() => {
      this.deleteRecord(user);
    });
  }

  setUpdate(user: any) {
    this.first_name = user.first_name;
    this.last_name = user.last_name;
    this.email = user.email;
    this.password = user.password;
    this.phone_number = user.phone_number;
    this.status = user.status;
    this.role = user.role;
    this.employee_role = user.employee_role;
    this.employee_supervisor = user.employee_supervisor;
    this.employee_image = user.employee_image;
    this.currentUserID = user.id;

    this.showForm = true;
    this.showTable = false;
  }

  toggleFormVisibility() {
    this.showForm = !this.showForm;
    this.showTable = false;
  }

  closeForm() {
    this.showForm = false;
  }

  goBack() {
    this.closeForm();
    this.clearFormData();
    this.showTable = true;
    this.updatePagedArray();
  }

  updatePagedArray(): void {
    const startIndex = (this.pageIndex - 1) * this.pageSize;
    const endIndex = Math.min(startIndex + this.pageSize, this.UserArray.length);

    console.log("Start Index:", startIndex);
    console.log("End Index:", endIndex);
    console.log("Total Length:", this.UserArray.length);

    this.pagedUserArray = this.UserArray.slice(startIndex, endIndex);
  }

  pageChanged(event: any): void {
    this.pageIndex = event.pageIndex + 1;
    this.updatePagedArray();
  }

  openImageSelectionModal(): void {
    const dialogRef = this.dialog.open(ImageSelectionModalComponent, {
      width: '600px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.selectedImage) {
        this.employee_image = result.selectedImage;
      }
    });
  }

  saveSelectedImage(imageName: string) {
    if (this.currentUserID) {
      this.imageService.updateEmployeeImage(this.currentUserID, imageName).subscribe(
        response => {
          console.log('Employee image updated successfully:', response);
        },
        error => {
          console.error('Error updating employee image:', error);
        }
      );
    } else {
      console.error('No employee selected for image update');
    }
  }


  toggleApprovalStatus(user: any) {
    user.status = !user.status; // Toggle approved status
    this.userService.updateUser(user.id, user).subscribe(
      () => {
        this.snackBar.open('Approval status updated successfully', 'Close', {
          duration: 6000,
          panelClass: ['success-snackbar']
        });
        this.getAllUsers();
      },
      error => {
        console.error('Error updating approval status:', error);
        this.snackBar.open('Failed to update approval status', 'Close', {
          duration: 6000,
          panelClass: ['error-snackbar']
        });
        // Revert the change if update fails (optional)
        user.status = !user.status;
      }
    );
  }

}
