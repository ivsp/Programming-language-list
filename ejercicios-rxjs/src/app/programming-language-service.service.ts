import { EventEmitter, Injectable, Output } from '@angular/core';
import { datosIniciales } from './common/data';
import { Lenguaje } from './programming-languages/interfaces/interfaces';
import { first, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProgrammingLanguageService {

  private _lenguajes: Lenguaje[] = localStorage.getItem('lenguajes') !== null ? JSON.parse(localStorage.getItem('lenguajes')!): datosIniciales;
  private _filterLenguajes: Lenguaje[] =  this._lenguajes;

  private _id : number = this._lenguajes.length  === 0 ? 1 : this._lenguajes.length+1;
  private _input!: Observable<string> ;

/**
 * Creo un get para mandar la información de los lenguajes
 * ya que no quiero que estos lenguajes se puedan manipular desde ningun
 * otro sitio de mi aplicacion
 */
get lenguajes():Lenguaje[]{
  return [...this._lenguajes]
}

get filterLenguajes():Lenguaje[]{
  return [...this._filterLenguajes]
}

get inputData(): any{
  return this._input.pipe(
    first()
  ).subscribe()
}

get input(): Observable<string>{
  return this._input
}

@Output() openModal: EventEmitter<any> = new EventEmitter()

  constructor() { }

      añadirLenguaje(lenguaje : Lenguaje){

        const dataForm = {
          ...lenguaje,
          id:this._id
        }
        this._lenguajes = [
          ...this._lenguajes,
          dataForm
        ]
        console.log(this._lenguajes)
        this._id++;
        localStorage.setItem('lenguajes', JSON.stringify(this._lenguajes))
      }


      cambiarInput(input:Observable<string>){
        this._input=input
          console.log('Input actualizado a:',this._input)
          return  this._input
      }

      filtradoLenguajes(inputData:string):Lenguaje[]{
        const inputDataToLowerCase = inputData.toLocaleLowerCase()
        this._filterLenguajes = this._lenguajes.filter(lenguaje => lenguaje.nombre.toLocaleLowerCase().includes(inputDataToLowerCase) ||
          lenguaje.categoria.toLocaleLowerCase().includes(inputDataToLowerCase) ||
          lenguaje.tipo.toLocaleLowerCase().includes(inputDataToLowerCase) )
          console.log('array filtrado', this.filterLenguajes)
          return this._filterLenguajes
      }
}
