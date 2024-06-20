import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ImageService } from 'src/app/api/images/image.service';

@Component({
  selector: 'app-image-selection-modal',
  templateUrl: './image-selection-modal.component.html',
  styleUrls: ['./image-selection-modal.component.css']
})
export class ImageSelectionModalComponent implements OnInit {
  images: any[] = [];
  selectedImage: string | null = null;

  constructor(
    private imageService: ImageService,
    public dialogRef: MatDialogRef<ImageSelectionModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.getAllImages();
  }

  getAllImages() {
    this.imageService.getAllImages().subscribe(
      images => {
        this.images = images;
      },
      error => {
        console.error('Error fetching images:', error);
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
}
