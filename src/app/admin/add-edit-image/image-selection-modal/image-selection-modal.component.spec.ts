import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageSelectionModalComponent } from './image-selection-modal.component';

describe('ImageSelectionModalComponent', () => {
  let component: ImageSelectionModalComponent;
  let fixture: ComponentFixture<ImageSelectionModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ImageSelectionModalComponent]
    });
    fixture = TestBed.createComponent(ImageSelectionModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
