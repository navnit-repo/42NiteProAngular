import { TestBed } from '@angular/core/testing';

import { ViewVenuesService } from './view-venues.service';

describe('ViewVenuesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ViewVenuesService = TestBed.get(ViewVenuesService);
    expect(service).toBeTruthy();
  });
});
