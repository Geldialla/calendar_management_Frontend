import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyEventsManagerComponent } from './my-events-manager.component';

describe('MyEventsManagerComponent', () => {
  let component: MyEventsManagerComponent;
  let fixture: ComponentFixture<MyEventsManagerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyEventsManagerComponent]
    });
    fixture = TestBed.createComponent(MyEventsManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
