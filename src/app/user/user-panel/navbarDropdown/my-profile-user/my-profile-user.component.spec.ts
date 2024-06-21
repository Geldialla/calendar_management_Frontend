import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyProfileUserComponent } from './my-profile-user.component';

describe('MyProfileUserComponent', () => {
  let component: MyProfileUserComponent;
  let fixture: ComponentFixture<MyProfileUserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyProfileUserComponent]
    });
    fixture = TestBed.createComponent(MyProfileUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
