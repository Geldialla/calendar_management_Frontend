import { Component, OnInit } from '@angular/core';
import { ImageService } from '../image.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-image-list',
  templateUrl: './image-list.component.html',
  styleUrls: ['./image-list.component.css']
})
export class ImageListComponent implements OnInit {
  images: any[] = []; // Array to store images fetched from backend
  isResultLoaded = false;
  searchKeyword: string = '';

  constructor(private imageService: ImageService, private snackBar: MatSnackBar) {}

  ngOnInit() {
    this.getAllImages();
  }

  getAllImages() {
    this.imageService.getAllImages()
      .subscribe(
        images => {
          this.isResultLoaded = true;
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

  deleteImage(imageId: number) {
    if (confirm('Are you sure you want to delete this image?')) {
      this.imageService.deleteImage(imageId)
        .subscribe(
          () => {
            // Remove the deleted image from the local array
            this.images = this.images.filter(img => img.id !== imageId);
            this.snackBar.open('Image deleted successfully.', 'Close', {
              duration: 6000,
              panelClass: ['success-snackbar']
            });
          },
          error => {
            console.error('Error deleting image:', error);
            this.snackBar.open('Error deleting image. Please try again.', 'Close', {
              duration: 6000,
              panelClass: ['error-snackbar']
            });
          }
        );
    }
  }

  search(): void {
    // Implement search functionality if needed
  }
}
