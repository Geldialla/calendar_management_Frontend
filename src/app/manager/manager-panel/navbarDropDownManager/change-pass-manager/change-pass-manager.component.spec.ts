import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangePassManagerComponent } from './change-pass-manager.component';

describe('ChangePassManagerComponent', () => {
  let component: ChangePassManagerComponent;
  let fixture: ComponentFixture<ChangePassManagerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChangePassManagerComponent]
    });
    fixture = TestBed.createComponent(ChangePassManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
