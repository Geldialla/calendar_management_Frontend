import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyEventsUserComponent } from './my-events-user.component';

describe('MyEventsUserComponent', () => {
  let component: MyEventsUserComponent;
  let fixture: ComponentFixture<MyEventsUserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyEventsUserComponent]
    });
    fixture = TestBed.createComponent(MyEventsUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
