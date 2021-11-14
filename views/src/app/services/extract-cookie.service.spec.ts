import { TestBed } from '@angular/core/testing';

import { ExtractCookieService } from './extract-cookie.service';

describe('ExtractCookieService', () => {
  let service: ExtractCookieService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExtractCookieService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
