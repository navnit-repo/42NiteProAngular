import { TestBed } from '@angular/core/testing';

import { PromotersService } from './promoters.service';

describe('PromotersService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PromotersService = TestBed.get(PromotersService);
    expect(service).toBeTruthy();
  });
});
