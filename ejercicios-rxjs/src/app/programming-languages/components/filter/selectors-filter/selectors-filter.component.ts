import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { distinctUntilChanged, tap } from 'rxjs';
import {
  Category,
  Type,
  Valoration,
} from 'src/app/programming-languages/interfaces/interfaces';
import { ProgrammingLanguageService } from 'src/app/service/programming-language-service.service';

@Component({
  selector: 'app-selectors-filter',
  templateUrl: './selectors-filter.component.html',
  styleUrls: ['./selectors-filter.component.css'],
})
export class SelectorsFilterComponent implements OnInit {
  @Input() form!: FormGroup;
  @Input() categorias!: Category[];
  @Input() tipos!: Type[];
  @Input() valoraciones!: Valoration[];

  constructor(private readonly builder: FormBuilder) {}

  ngOnInit(): void {}

  //Función que resetea los valores del formulario y que por consecuencia,
  //realiza la subcripción a los observables que cambian de valor, restaurando la lista inicial de datos.
  reset(): void {
    console.log(this.form.value);
    this.form.reset({
      search: '',
      categorySelect: '',
      typeSelect: '',
      valorationSelect: '',
    });
    console.log(this.form.value);
  }
}
