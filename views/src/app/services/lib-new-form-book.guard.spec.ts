import { TestBed } from '@angular/core/testing';

import { LibNewFormBookGuard } from './lib-new-form-book.guard';

describe('LibNewFormBookGuard', () => {
  let guard: LibNewFormBookGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(LibNewFormBookGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
