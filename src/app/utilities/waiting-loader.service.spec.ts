import { TestBed } from '@angular/core/testing';

import { WaitingLoaderService } from './waiting-loader.service';

describe('WaitingLoaderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WaitingLoaderService = TestBed.get(WaitingLoaderService);
    expect(service).toBeTruthy();
  });
});
