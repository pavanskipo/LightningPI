import { TestBed } from '@angular/core/testing';

import { CommonSwitchService } from './common-switch.service';

describe('CommonSwitchService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CommonSwitchService = TestBed.get(CommonSwitchService);
    expect(service).toBeTruthy();
  });
});
