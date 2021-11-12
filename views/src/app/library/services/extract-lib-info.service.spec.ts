import { TestBed } from '@angular/core/testing';

import { ExtractLibInfoService } from './extract-lib-info.service';

describe('ExtractLibInfoService', () => {
  let service: ExtractLibInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExtractLibInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
