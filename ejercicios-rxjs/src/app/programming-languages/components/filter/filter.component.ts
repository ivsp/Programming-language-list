import { Component, OnInit } from '@angular/core';
import { debounceTime, distinctUntilChanged, filter, map, tap } from 'rxjs';
import { Categoria, Tipo, Valoracion } from '../../interfaces/interfaces';
import { categorias, tipos, valoraciones } from 'src/app/common/data';
import { ProgrammingLanguageService } from 'src/app/service/programming-language-service.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',

  styleUrls: ['./filter.component.css'],
})
export class FilterComponent implements OnInit {
  public categorias: Categoria[] = categorias;
  public tipos: Tipo[] = tipos;
  public valoraciones: Valoracion[] = valoraciones;
  form!: FormGroup;

  get searchValue(): string {
    return this.languageService.searchValue;
  }

  constructor(
    private languageService: ProgrammingLanguageService,
    private readonly builder: FormBuilder
  ) {}

  openModal() {
    console.log('open modal');
  }

  ngOnInit() {
    this.form = this.builder.group({
      search: [''],
      categorySelect: [''],
      typeSelect: [''],
      valorationSelect: [''],
    });

    //El método valueChanges emite un valor del observable cada vez que el campo especificado cambia de valor
    this.form
      .get('search')
      ?.valueChanges.pipe(
        distinctUntilChanged(),
        debounceTime(1000),
        filter((value) => !value || value.length >= 3 || value.length === 0)
      )
      .subscribe((value) => {
        console.log('new value', value);
        this.languageService.filterLanguagesByName(value);
      });

    this.form
      .get('categorySelect')
      ?.valueChanges.pipe(
        tap((value) =>
          console.log('antes del filtro', this.languageService.categoryValue)
        ),
        distinctUntilChanged(),
        map((value) => this.languageService.filterCategory(value)),
        tap((value) => {
          console.log('despues del filtro', this.languageService.categoryValue);
          console.log('el valor', value);
          console.log('la prueba', this.form.get('categorySelect')?.value);
        })
      )
      .subscribe((value) => {
        console.log('new value', value);
        this.languageService.filterLanguages(
          this.form.get('search')?.value,
          value,
          this.form.get('typeSelect')?.value,
          this.form.get('valorationSelect')?.value
        );
      });

    this.form
      .get('typeSelect')
      ?.valueChanges.pipe(
        tap(() =>
          console.log('antes del filtro', this.languageService.typeValue)
        ),
        distinctUntilChanged(),
        map((value) => this.languageService.filterType(value)),
        tap((value) => {
          console.log('despues del filtro', this.languageService.typeValue);
          console.log('el valor', value);
        })
      )
      .subscribe((value) => {
        console.log('new value', value);
        this.languageService.filterLanguages(
          this.form.get('search')?.value,
          this.form.get('categorySelect')?.value,
          value,
          this.form.get('valorationSelect')?.value
        );
      });

    this.form
      .get('valorationSelect')
      ?.valueChanges.pipe(
        tap((value) => {
          console.log('antes del filtro', this.languageService.valorationValue);
          console.log(value);
        }),
        distinctUntilChanged(),
        map((value) => this.languageService.filterValoration(value)),
        tap((value) => {
          console.log(
            'despues del filtro',
            this.languageService.valorationValue
          );
          console.log('el valor', value);
        })
      )
      .subscribe((value) => {
        console.log('new value', value);
        this.languageService.filterLanguages(
          this.form.get('search')?.value,
          this.form.get('categorySelect')?.value,
          this.form.get('typeSelect')?.value,
          value
        );
      });

    this.form.valueChanges.pipe().subscribe(console.log);
  }
}
