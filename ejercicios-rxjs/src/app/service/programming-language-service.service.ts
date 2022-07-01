import { EventEmitter, Injectable, Output } from '@angular/core';
import { datosIniciales } from '../common/data';
import { Language } from '../programming-languages/interfaces/interfaces';
import { first, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProgrammingLanguageService {

  private _languages: Language[] = localStorage.getItem('lenguajes') !== null ? JSON.parse(localStorage.getItem('lenguajes')!): datosIniciales;
  private _filterLanguages: Language[] =  this._languages;
  private _id : number = this._languages.length  === 0 ? 1 : this._languages.length+1;
  private _input!: Observable<string> ;

  /**
   * Creo un get para mandar la información de los lenguajes
   * ya que no quiero que estos lenguajes se puedan manipular desde ningun
   * otro sitio de mi aplicacion
   */
  get languages():Language[]{
    return [...this._languages]
  }

  get filterLanguages():Language[]{
    return [...this._filterLanguages]
  }

  get input(): Observable<string>{
    return this._input
  }

  @Output() openModal: EventEmitter<any> = new EventEmitter()

  constructor() { }

  addLanguae(languaje : Language){
    const dataForm = {
      ...languaje,
      id:this._id
    }
    this._languages = [
      ...this._languages,
      dataForm
    ]
    console.log(this._languages)
    this._id++;
    localStorage.setItem('lenguajes', JSON.stringify(this._languages))
  }

  filterLanguajes(inputData:string):Language[]{
    const inputDataToLowerCase = inputData.toLocaleLowerCase()
    this._filterLanguages = this._languages.filter(language => language.nombre.toLocaleLowerCase().includes(inputDataToLowerCase) ||
    language.categoria.toLocaleLowerCase().includes(inputDataToLowerCase) ||
    language.tipo.toLocaleLowerCase().includes(inputDataToLowerCase) )
    console.log('array filtrado', this.filterLanguages)
    return this._filterLanguages
  }

}
