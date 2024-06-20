import { TestBed } from '@angular/core/testing';

import { HierarchyyService } from './hierarchyy.service';

describe('HierarchyyService', () => {
  let service: HierarchyyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HierarchyyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
