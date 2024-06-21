import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangePassUserComponent } from './change-pass-user.component';

describe('ChangePassUserComponent', () => {
  let component: ChangePassUserComponent;
  let fixture: ComponentFixture<ChangePassUserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChangePassUserComponent]
    });
    fixture = TestBed.createComponent(ChangePassUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
