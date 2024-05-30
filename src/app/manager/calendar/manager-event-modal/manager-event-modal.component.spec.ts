import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerEventModalComponent } from './manager-event-modal.component';

describe('ManagerEventModalComponent', () => {
  let component: ManagerEventModalComponent;
  let fixture: ComponentFixture<ManagerEventModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManagerEventModalComponent]
    });
    fixture = TestBed.createComponent(ManagerEventModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
