import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ImageService } from 'src/app/api/images/image.service';

@Component({
  selector: 'app-add-edit-image',
  templateUrl: './add-edit-image.component.html',
  styleUrls: ['./add-edit-image.component.css']
})
export class AddEditImageComponent implements OnInit {
  imageForm!: FormGroup;
  selectedFile: File | null = null;

  constructor(
    private fb: FormBuilder,
    private imageService: ImageService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.imageForm = this.fb.group({
      image: [null, Validators.required]
    });
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
        () => {
          this.snackBar.open('Image uploaded successfully.', 'Close', {
            duration: 6000,
            panelClass: ['success-snackbar']
          });
          this.imageForm.reset(); // Reset the form
          this.selectedFile = null; // Clear selected file
        },
        error => {
          this.snackBar.open('Image uploaded successfully', 'Close', {
            duration: 6000,
            panelClass: ['success-snackbar']
          });
          this.imageForm.reset(); // Reset the form
          this.selectedFile = null; // Clear selected file
        }
      );
    }
  }
}
