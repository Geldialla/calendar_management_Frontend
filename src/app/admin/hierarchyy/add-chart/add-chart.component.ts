import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ImageSelectionModalComponent } from '../image-selection-modal/image-selection-modal.component';
import { ImageService } from 'src/app/service/images/image.service';
import { HierarchyyService } from 'src/app/service/hierarchyy/hierarchyy.service';
import { RolesService } from 'src/app/service/roles/roles.service';
import { UserService } from 'src/app/service/users/users.service';

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

  constructor(
    private snackBar: MatSnackBar,
    public dialog: MatDialog,
    private imageService: ImageService,
    private hierarchyyService: HierarchyyService,
    private roleServise: RolesService,
    private userService: UserService,
  ) {
    this.getAllHierarchyy();
    this.getAllRoles();
    this.getAllUsers();
  }

  ngOnInit(): void {
    this.getAllHierarchyy();
    this.updatePagedArray();
    this.getAllRoles();
    this.getAllUsers();
  }

  getAllHierarchyy() {
    this.hierarchyyService.getAllHierarchyy()
      .subscribe((resultData: any) => {
        this.isResultLoaded = true;
        this.HierarchyArray = resultData.data;
        this.updatePagedArray();
      });
  }

  getAllUsers() {
    this.userService.getAllUsers()
      .subscribe((resultData: any) => {
        this.isResultLoaded = true;
        this.UserArray = resultData.data;
        this.updatePagedArray();
      });
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
      this.pagedHierarchyArray = this.HierarchyArray.filter(employee_name =>
        employee_name.employee_name.toLowerCase().includes(this.searchKeyword.toLowerCase())
      );
    } else {
      this.updatePagedArray();
    }
  }

  addHierarchyy() {
    let hierarchy = {
      "employee_name": this.employee_name,
      "employee_role": this.employee_role,
      "employee_supervisor": this.employee_supervisor,
      "employee_image": this.employee_image, // Ensure this is just the image name
    };
  
    this.hierarchyyService.addHierarchyy(hierarchy)
      .pipe(
        catchError(error => {
          console.error('Error registering Employee:', error);
          return throwError(error);
        })
      )
      .subscribe((resultData: any) => {
        this.snackBar.open('Employee Registered Successfully', 'Close', {
          duration: 6000,
          panelClass: ['success-snackbar']
        });
        this.getAllHierarchyy();
        this.clearFormData();
        this.showTable = true;
        this.updatePagedArray();
        this.showForm = false;
      }, error => {
        this.snackBar.open('Error registering Employee. Please try again.', 'Close', {
          duration: 6000,
          panelClass: ['error-snackbar']
        });
      });
  }
  

  deleteHierarchyy(hierarchy: any) {
    this.hierarchyyService.deleteHierarchyy(hierarchy.id)
      .subscribe((resultData) => {
        this.snackBar.open('Employee Deleted Successfully', 'Close', {
          duration: 6000,
          panelClass: ['success-snackbar']
        });
        this.getAllHierarchyy();
      });
  }

  updateHierarchyy() {
    let hierarchy = {
      "employee_name": this.employee_name,
      "employee_role": this.employee_role,
      "employee_supervisor": this.employee_supervisor,
      "employee_image": this.employee_image,
    };

    this.hierarchyyService.updateHierarchyy(this.currentHierarchyID, hierarchy).subscribe((resultData: any) => {
        this.snackBar.open('Employee Updated successfully', 'Close', {
          duration: 6000,
          panelClass: ['success-snackbar']
        });
        this.getAllHierarchyy();
        this.showForm = false;
      });
  }

  save() {
    if (this.currentHierarchyID === '') {
      this.addHierarchyy();
    } else {
      this.updateHierarchyy();
    }
    this.clearFormData();
    this.showTable = true;
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
      this.deleteHierarchyy(data);
    });
  }

  setUpdate(data: any) {
    this.employee_name = data.employee_name;
    this.employee_role = data.employee_role;
    this.employee_supervisor = data.employee_supervisor;
    this.employee_image = data.employee_image;
    this.currentHierarchyID = data.id;
    this.showForm = true;
    this.showTable = false;
  }

  showForm: boolean = false;
  showTable: boolean = true;

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

  pageSize = 10;
  pageIndex = 1;
  pagedHierarchyArray: any[] = [];

  updatePagedArray(): void {
    const startIndex = (this.pageIndex - 1) * this.pageSize;
    const endIndex = Math.min(startIndex + this.pageSize, this.HierarchyArray.length);

    this.pagedHierarchyArray = this.HierarchyArray.slice(startIndex, endIndex);
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
    if (this.currentHierarchyID) {
      this.imageService.updateEmployeeImage(this.currentHierarchyID, imageName).subscribe(
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
}
