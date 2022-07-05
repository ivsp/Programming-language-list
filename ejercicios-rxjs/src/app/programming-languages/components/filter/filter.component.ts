import { Component, OnInit } from '@angular/core';
import { debounceTime, distinctUntilChanged, filter, map, tap } from 'rxjs';
import { Category, Type, Valoration } from '../../interfaces/interfaces';
import { categorias, tipos, valoraciones } from 'src/app/common/data';
import { ProgrammingLanguageService } from 'src/app/service/programming-language-service.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',

  styleUrls: ['./filter.component.css'],
})
export class FilterComponent implements OnInit {
  public categorias: Category[] = categorias;
  public tipos: Type[] = tipos;
  public valoraciones: Valoration[] = valoraciones;
  public form!: FormGroup;

  constructor(
    private languageService: ProgrammingLanguageService,
    private readonly builder: FormBuilder
  ) {}

  /**
   * Aqui creo el formulario. Desde los componentes hijos emito los valores seleccionados en el formulario
   * y los leo en este componente y me suscribo al observable desde aqui!
   */

  ngOnInit() {
    this.form = this.builder.group({
      search: [''],
      categorySelect: [''],
      typeSelect: [''],
      valorationSelect: [''],
    });

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
}
