import { TestBed } from '@angular/core/testing';
import { ProgrammingLanguageService } from 'src/app/service/programming-language-service.service';


describe('ProgrammingLanguageService', () => {
  let service: ProgrammingLanguageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProgrammingLanguageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
