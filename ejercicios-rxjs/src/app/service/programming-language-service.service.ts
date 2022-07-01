import { EventEmitter, Injectable, Output } from '@angular/core';
import { datosIniciales } from '../common/data';
import { Language } from '../programming-languages/interfaces/interfaces';
import { Observable, filter } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProgrammingLanguageService {
  private _languages: Language[] =
    localStorage.getItem('lenguajes') !== null
      ? JSON.parse(localStorage.getItem('lenguajes')!)
      : datosIniciales;
  private _filterLanguages: Language[] = this._languages;
  private _id: number =
    this._languages.length === 0 ? 1 : this._languages.length + 1;
  private _input!: Observable<string>;
  private _searchValue!: string;
  private _categoryValue!: string;
  private _typeValue!: string;
  private _valorationValue!: string;

  /**
   * Creo un get para mandar la información de los lenguajes
   * ya que no quiero que estos lenguajes se puedan manipular desde ningun
   * otro sitio de mi aplicacion
   */
  get languages(): Language[] {
    return [...this._languages];
  }

  get filteredLanguages(): Language[] {
    return [...this._filterLanguages];
  }

  get input(): Observable<string> {
    return this._input;
  }

  get searchValue(): string {
    return this._searchValue;
  }

  get categoryValue(): string {
    return this._categoryValue;
  }

  get typeValue(): string {
    return this._typeValue;
  }

  get valorationValue(): string {
    return this._valorationValue;
  }

  @Output() openModal: EventEmitter<any> = new EventEmitter();

  constructor() {}

  addLanguae(languaje: Language) {
    const dataForm = {
      ...languaje,
      id: this._id,
    };
    this._languages = [...this._languages, dataForm];
    console.log(this._languages);
    this._id++;
    localStorage.setItem('lenguajes', JSON.stringify(this._languages));
  }

  /**
  *  filterLanguajes(inputData: string): Language[] {
    const inputDataToLowerCase = inputData.toLocaleLowerCase();
    this._filterLanguages = this._languages.filter(
      (language) =>
        language.nombre.toLocaleLowerCase().includes(inputDataToLowerCase) ||
        language.categoria.toLocaleLowerCase().includes(inputDataToLowerCase) ||
        language.tipo.toLocaleLowerCase().includes(inputDataToLowerCase)
    );
    console.log('array filtrado', this.filterLanguages);
    return this._filterLanguages;
  }
  */

  filterLanguages(
    search: string,
    category: string,
    type: string,
    valoration: string
  ): Language[] {
    console.log('busqueda', search);
    console.log('categoria', category);
    console.log('tipo', type);
    console.log('valoracion', valoration);

    const inputDataToLowerCase = search.toLowerCase();
    this._filterLanguages = this._languages.filter((language) =>
      //al hacer el filtrado usando strings vacios no me devuelve ningun elemento del array
      search !== ''
        ? language.nombre.toLowerCase().includes(inputDataToLowerCase)
        : '' && category !== ''
        ? language.categoria === category
        : '' && type !== ''
        ? language.tipo === type
        : '' && valoration !== ''
        ? language.valoracion >= parseInt(valoration)
        : ''
    );
    console.log('array filtrado', this._filterLanguages);
    return this._filterLanguages;
  }

  filterSearchValue(search: string): string {
    this._searchValue = search;
    return this._searchValue;
  }

  filterCategory(category: string): string {
    if (category === 'Todos') {
      this._categoryValue = '';
      return this._categoryValue;
    } else {
      this._categoryValue = category;
      return this._categoryValue;
    }
  }

  filterType(type: string): string {
    if (type === 'Todos') {
      this._typeValue = '';
      return this._typeValue;
    } else {
      this._typeValue = type;
      return this._typeValue;
    }
  }

  filterValoration(valoration: string): string {
    this._valorationValue = valoration;
    console.log(valoration);
    console.log(this._valorationValue);
    return this._valorationValue;
  }
}
