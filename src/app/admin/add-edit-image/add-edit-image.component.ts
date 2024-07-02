import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ImageService } from 'src/app/service/images/image.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-add-edit-image',
  templateUrl: './add-edit-image.component.html',
  styleUrls: ['./add-edit-image.component.css']
})
export class AddEditImageComponent implements OnInit {
  imageForm!: FormGroup;
  selectedFile: File | null = null;
  images: any[] = [];
  isResultLoaded = false;
  pageSize = 10;
  pageIndex = 1;
  pagedImagesArray: any[] = [];
  showForm: boolean = false;
  showImages: boolean = true;
  imageBaseUrl: string = '';

  constructor(
    private fb: FormBuilder,
    private imageService: ImageService,
    private snackBar: MatSnackBar,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.imageForm = this.fb.group({
      image: [null, Validators.required]
    });
    this.imageBaseUrl = this.imageService.getImageBaseUrl();
    this.getAllImages();
    this.checkSnackbarMessage();
  }
  
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  removeSelectedFile(): void {
    this.imageForm.get('image')?.setValue(null);
    this.selectedFile = null;
  }

  onSubmit(): void {
    if (this.imageForm.valid && this.selectedFile) {
      const formData = new FormData();
      formData.append('image', this.selectedFile, this.selectedFile.name);

      this.imageService.uploadImage(formData).subscribe(
        (response: any) => {
          // Prepend the new image to the images array
          this.images.unshift(response.data); // Assuming response.data contains the new image object
          this.storeSnackbarMessage('Image uploaded successfully.', 'success-snackbar');
          this.showSnackbar('Image uploaded successfully.', 'success-snackbar');
          this.reloadPage();
        },
        error => {
          this.storeSnackbarMessage('Image uploaded successfully.', 'success-snackbar');
          this.showSnackbar('Image uploaded successfully.', 'success-snackbar');
          this.reloadPage();
        }
      );
    }
  }

  getAllImages() {
    this.imageService.getAllImages().subscribe(
      images => {
        this.isResultLoaded = true;
        this.images = images;
        this.updatePagedArray();
      },
      error => {
        console.error('Error fetching images:', error);
        this.snackBar.open('Error fetching images. Please try again.', 'Close', {
          duration: 6000,
          panelClass: ['error-snackbar']
        });
      }
    );
  }

  deleteImage(filename: string) {
    if (confirm('Are you sure you want to delete this image?')) {
      this.imageService.deleteImage(filename).subscribe(
        () => {
          // Remove the deleted image from the local array
          this.images = this.images.filter(img => img.image_path !== filename);
          this.storeSnackbarMessage('Image deleted successfully.', 'success-snackbar');
          this.showSnackbar('Image deleted successfully.', 'success-snackbar');
          this.reloadPage();
        },
        () => {
          this.storeSnackbarMessage('Image deleted successfully.', 'success-snackbar');
          this.showSnackbar('Image deleted successfully.', 'success-snackbar');
          this.reloadPage();
        }
      );
    }
  }

  showSnackbar(message: string, panelClass: string) {
    this.snackBar.open(message, 'Close', {
      duration: 6000,
      panelClass: [panelClass]
    });
  }

  storeSnackbarMessage(message: string, panelClass: string) {
    sessionStorage.setItem('snackbarMessage', message);
    sessionStorage.setItem('snackbarPanelClass', panelClass);
  }

  checkSnackbarMessage() {
    const message = sessionStorage.getItem('snackbarMessage');
    const panelClass = sessionStorage.getItem('snackbarPanelClass');
    if (message && panelClass) {
      this.showSnackbar(message, panelClass);
      sessionStorage.removeItem('snackbarMessage');
      sessionStorage.removeItem('snackbarPanelClass');
    }
  }

  reloadPage() {
    this.location.go(this.location.path());
    window.location.reload();
  }

  toggleFormVisibility() {
    this.showForm = !this.showForm;
    this.showImages = false;
  }

  closeForm() {
    this.showForm = false;
    this.showImages = true;
    this.updatePagedArray();
  }

  goBack() {
    this.closeForm();
  }

  updatePagedArray(): void {
    const startIndex = (this.pageIndex - 1) * this.pageSize;
    const endIndex = Math.min(startIndex + this.pageSize, this.images.length);

    console.log("Start Index:", startIndex);
    console.log("End Index:", endIndex);
    console.log("Total Length:", this.images.length);

    this.pagedImagesArray = this.images.slice(startIndex, endIndex);
  }

  pageChanged(event: any): void {
    this.pageIndex = event.pageIndex + 1;
    this.updatePagedArray();
  }
}
