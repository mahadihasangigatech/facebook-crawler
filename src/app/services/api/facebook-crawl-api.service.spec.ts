import { TestBed } from '@angular/core/testing';

import { FacebookCrawlApiService } from './facebook-crawl-api.service';

describe('FacebookCrawlApiService', () => {
  let service: FacebookCrawlApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FacebookCrawlApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
