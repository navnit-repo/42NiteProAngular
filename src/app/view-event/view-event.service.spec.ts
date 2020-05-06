import { TestBed } from '@angular/core/testing';

import { ViewEventService } from './view-event.service';

describe('ViewEventService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ViewEventService = TestBed.get(ViewEventService);
    expect(service).toBeTruthy();
  });
});
