import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerHierarchyComponent } from './manager-hierarchy.component';

describe('ManagerHierarchyComponent', () => {
  let component: ManagerHierarchyComponent;
  let fixture: ComponentFixture<ManagerHierarchyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManagerHierarchyComponent]
    });
    fixture = TestBed.createComponent(ManagerHierarchyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
