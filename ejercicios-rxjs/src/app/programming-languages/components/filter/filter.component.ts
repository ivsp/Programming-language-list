import { Component, OnInit } from '@angular/core';
import { debounceTime, distinctUntilChanged, filter, map, tap } from 'rxjs';
import { Category, Type, Valoration } from '../../interfaces/interfaces';
import { categorias, tipos, valoraciones } from 'src/app/common/data';
import { ProgrammingLanguageService } from 'src/app/service/programming-language-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
   * Lo ideal sería el crear 2 formularios en cada componente hijo que manden mediante un
   * eventEmitter los valores de los campos al componente padre y que las subcripciones
   * a los cambios de esos campos se realicen desde aquí.
   */

  ngOnInit() {
    this.form = this.builder.group({
      search: [''],
      categorySelect: [''],
      typeSelect: [''],
      valorationSelect: [''],
    });
  }
}
