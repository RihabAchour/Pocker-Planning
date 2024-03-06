import { TestBed } from '@angular/core/testing';

import { ChefprojetGuard } from './chefprojet.guard';

describe('ChefprojetGuard', () => {
  let guard: ChefprojetGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ChefprojetGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
