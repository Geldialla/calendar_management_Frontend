import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyProfileManagerComponent } from './my-profile-manager.component';

describe('MyProfileManagerComponent', () => {
  let component: MyProfileManagerComponent;
  let fixture: ComponentFixture<MyProfileManagerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyProfileManagerComponent]
    });
    fixture = TestBed.createComponent(MyProfileManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
