import { TestBed } from '@angular/core/testing';

import { LeaveRecipeFormGuard } from './leave-recipe-form.guard';

describe('LeaveRecipeFormGuard', () => {
  let guard: LeaveRecipeFormGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(LeaveRecipeFormGuard);
  });

  // it('should be created', () => {
  //   expect(guard).toBeTruthy();
  // });
});
