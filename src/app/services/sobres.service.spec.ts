import { TestBed } from '@angular/core/testing';

import { SobresService } from './sobres.service';

describe('SobresService', () => {
  let service: SobresService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SobresService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
