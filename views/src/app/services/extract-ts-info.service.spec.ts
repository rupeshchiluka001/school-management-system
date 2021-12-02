import { TestBed } from '@angular/core/testing';

import { ExtractTsInfoService } from './extract-ts-info.service';

describe('ExtractTsInfoService', () => {
  let service: ExtractTsInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExtractTsInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
