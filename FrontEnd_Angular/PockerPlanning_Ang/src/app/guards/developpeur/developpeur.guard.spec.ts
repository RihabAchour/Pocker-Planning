import { TestBed } from '@angular/core/testing';

import { DeveloppeurGuard } from './developpeur.guard';

describe('DeveloppeurGuard', () => {
  let guard: DeveloppeurGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(DeveloppeurGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
