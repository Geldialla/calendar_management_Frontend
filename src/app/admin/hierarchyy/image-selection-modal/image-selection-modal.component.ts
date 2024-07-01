import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ImageService } from 'src/app/service/images/image.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-image-selection-modal',
  templateUrl: './image-selection-modal.component.html',
  styleUrls: ['./image-selection-modal.component.css']
})
export class ImageSelectionModalComponent implements OnInit {
  images: any[] = [];
  selectedImage: string | null = null;
  imageForm!: FormGroup;
  selectedFile: File | null = null;

  constructor(
    private fb: FormBuilder,
    private imageService: ImageService,
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<ImageSelectionModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.imageForm = this.fb.group({
      image: [null, Validators.required]
    });
    this.getAllImages();
  }

  getAllImages() {
    this.imageService.getAllImages().subscribe(
      images => {
        this.images = images;
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

  selectImage(imageName: string) {
    this.selectedImage = imageName;
  }

  onConfirm(): void {
    if (this.selectedImage) {
      this.dialogRef.close({ selectedImage: this.selectedImage });
    } else {
      console.error('No image selected');
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  onSubmit(): void {
    if (this.imageForm.valid && this.selectedFile) {
      const formData = new FormData();
      formData.append('image', this.selectedFile, this.selectedFile.name);

      this.imageService.uploadImage(formData).subscribe(
        response => {
          this.snackBar.open('Image uploaded successfully.', 'Close', {
            duration: 6000,
            panelClass: ['success-snackbar']
          });
          // Reload the images list
          this.getAllImages();
        },
        error => {
          this.snackBar.open('Image uploaded successfully.', 'Close', {
            duration: 6000,
            panelClass: ['success-snackbar']
          });
          this.getAllImages();
        }
      );
    }
  }
}
