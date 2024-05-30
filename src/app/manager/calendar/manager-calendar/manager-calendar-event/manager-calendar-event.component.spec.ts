import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerCalendarEventComponent } from './manager-calendar-event.component';

describe('ManagerCalendarEventComponent', () => {
  let component: ManagerCalendarEventComponent;
  let fixture: ComponentFixture<ManagerCalendarEventComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManagerCalendarEventComponent]
    });
    fixture = TestBed.createComponent(ManagerCalendarEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
