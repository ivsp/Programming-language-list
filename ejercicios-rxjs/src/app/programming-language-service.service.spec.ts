import { TestBed } from '@angular/core/testing';

import { ProgrammingLanguageServiceService } from './programming-language-service.service';

describe('ProgrammingLanguageServiceService', () => {
  let service: ProgrammingLanguageServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProgrammingLanguageServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
