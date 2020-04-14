import { TestBed } from '@angular/core/testing';

import { PersonsDataserviceService } from './persons-dataservice.service';

describe('PersonsDataserviceService', () => {
  let service: PersonsDataserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PersonsDataserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
