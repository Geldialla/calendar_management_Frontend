import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ImageService } from '../image.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-edit-image',
  templateUrl: './add-edit-image.component.html',
  styleUrls: ['./add-edit-image.component.css']
})
export class AddEditImageComponent implements OnInit {
  imageForm!: FormGroup;
  selectedFile: File | null = null;

  constructor(private fb: FormBuilder, private imageService: ImageService, private snackBar: MatSnackBar) {}

  ngOnInit() {
    this.imageForm = this.fb.group({
      image: [null, Validators.required]
    });
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  onSubmit() {
    if (this.imageForm.valid && this.selectedFile) {
      const fd = new FormData();
      fd.append('image', this.selectedFile, this.selectedFile.name);

      this.imageService.uploadImage(fd)
        .subscribe(
          () => {
            this.snackBar.open('Image uploaded successfully.', 'Close', {
              duration: 6000,
              panelClass: ['success-snackbar']
            });
          },
          error => {
            console.error('Error uploading image:', error);
            this.snackBar.open('Error uploading image. Please try again.', 'Close', {
              duration: 6000,
              panelClass: ['error-snackbar']
            });
          }
        );
    }
  }
}
