import { Component, OnInit } from '@angular/core';
import { ProgrammingLanguageService } from '../../../service/programming-language-service.service';
import { Language } from '../../interfaces/interfaces';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnInit {
  get languages(): Language[] {
    return this.languageService.languages;
  }

  get input(): Observable<string> {
    return this.languageService.input;
  }

  get filterLanguages(): Language[] {
    return this.languageService.filteredLanguages;
  }

  constructor(private languageService: ProgrammingLanguageService) {}

  ngOnInit(): void {}
}
