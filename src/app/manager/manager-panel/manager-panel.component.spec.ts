import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerPanelComponent } from './manager-panel.component';

describe('ManagerPanelComponent', () => {
  let component: ManagerPanelComponent;
  let fixture: ComponentFixture<ManagerPanelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManagerPanelComponent]
    });
    fixture = TestBed.createComponent(ManagerPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
