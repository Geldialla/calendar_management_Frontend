import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditImageComponent } from './add-edit-image.component';

describe('AddEditImageComponent', () => {
  let component: AddEditImageComponent;
  let fixture: ComponentFixture<AddEditImageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddEditImageComponent]
    });
    fixture = TestBed.createComponent(AddEditImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
