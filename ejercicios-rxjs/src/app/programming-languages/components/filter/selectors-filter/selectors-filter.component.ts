import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { distinctUntilChanged, tap, Observable } from 'rxjs';
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

  aviableCategories$!: Observable<Category[]>;
  aviableTypes$!: Observable<Type[]>;
  aviableValorations$!: Observable<Valoration[]>;

  constructor(private languageService: ProgrammingLanguageService) {}

  ngOnInit(): void {
    this.aviableCategories$ = this.languageService.aviableCategories$;
    this.aviableTypes$ = this.languageService.aviableTypes$;
    this.aviableValorations$ = this.languageService.aviableValorations$;
    //El método valueChanges emite un valor del observable cada vez que el campo especificado cambia de valor

    this.form
      .get('categorySelect')
      ?.valueChanges.pipe(
        tap(),
        //(value) => console.log('antes del filtro', value)
        distinctUntilChanged(),

        tap((value) => {
          //console.log('despues del filtro', value);
          //console.log('el valor', value);
          //console.log('la prueba', this.form.get('categorySelect')?.value);
        })
      )
      .subscribe((value) => {
        //console.log('new value', value);
        this.languageService.filterCategory(
          this.form.get('categorySelect')?.value
        );
      });

    this.form
      .get('typeSelect')
      ?.valueChanges.pipe(
        tap((value) => {
          //console.log('antes del filtro', value)
        }),
        distinctUntilChanged(),
        tap((value) => {
          //console.log('despues del filtro', value);
        })
      )
      .subscribe((value) => {
        //console.log('new value', value);
        this.languageService.filterType(this.form.get('typeSelect')?.value);
      });

    this.form
      .get('valorationSelect')
      ?.valueChanges.pipe(
        tap((value) => {
          //console.log('antes del filtro', value);
          //console.log(value);
        }),
        distinctUntilChanged(),
        tap((value) => {
          //console.log('despues del filtro', value);
        })
      )
      .subscribe((value) => {
        //console.log('new value', value);
        this.languageService.filterValoration(
          this.form.get('valorationSelect')?.value
        );
      });
  }

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
