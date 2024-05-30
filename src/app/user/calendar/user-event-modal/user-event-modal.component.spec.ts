import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserEventModalComponent } from './user-event-modal.component';

describe('UserEventModalComponent', () => {
  let component: UserEventModalComponent;
  let fixture: ComponentFixture<UserEventModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserEventModalComponent]
    });
    fixture = TestBed.createComponent(UserEventModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
