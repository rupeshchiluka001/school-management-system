import { TestBed } from '@angular/core/testing';

import { ExtractHostelInfoService } from './extract-hostel-info.service';

describe('ExtractHostelInfoService', () => {
  let service: ExtractHostelInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExtractHostelInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
