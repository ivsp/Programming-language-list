import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { debounceTime, distinctUntilChanged, filter } from 'rxjs';
import {
  Category,
  Type,
  Valoration,
} from 'src/app/programming-languages/interfaces/interfaces';
import { ProgrammingLanguageService } from 'src/app/service/programming-language-service.service';

@Component({
  selector: 'app-input-filter',
  templateUrl: './input-filter.component.html',
  styleUrls: ['./input-filter.component.css'],
})
export class InputFilterComponent implements OnInit {
  @Input() form!: FormGroup;
  //@Output() onNewSearchValue: EventEmitter<string> = new EventEmitter();

  constructor(private languageService: ProgrammingLanguageService) {}

  ngOnInit(): void {
    this.form
      .get('search')
      ?.valueChanges.pipe(
        distinctUntilChanged(),
        debounceTime(1000),
        filter((value) => !value || value.length >= 3 || value.length === 0)
      )
      .subscribe((value) => {
        this.languageService.filterLanguagesByName(value);
      });
  }

  newInput(value: any) {
    console.log(value);
    // return this.form.get('search')?.value;
  }
}
