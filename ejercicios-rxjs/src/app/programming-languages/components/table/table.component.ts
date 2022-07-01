import { Component, OnInit } from '@angular/core';
import { ProgrammingLanguageService } from '../../../programming-language-service.service';
import { Lenguaje } from '../../interfaces/interfaces';
import { filter, first, map, Observable, tap } from 'rxjs';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {


  get lenguajes (): Lenguaje[] {
    return this.lenguajeService.lenguajes
  }
  //Esto no lo necesito, necesito el observable
  // get inputValue(): string{
  //   return this.lenguajeService.inputData
  // }

  get input(): Observable<string>{
    return this.lenguajeService.input
  }
  get filterLenguajes(): Lenguaje[]{
    return this.lenguajeService.filterLenguajes
  }

  // public filterLenguajes: Lenguaje[] =  this.lenguajeService.lenguajes;

  constructor( private lenguajeService: ProgrammingLanguageService) {  }


 /**
  *  filtradoLenguajes(inputData:string):Lenguaje[]{
console.log(inputData)
    if(inputData !== '' && inputData.length >=3){
      console.log('en el if')
      this.filterLenguajes = this.lenguajeService.lenguajes.filter(lenguaje => lenguaje.nombre.includes(inputData) ||
      lenguaje.categoria.includes(inputData) ||
      lenguaje.tipo.includes(inputData) )
      console.log('array filtrado', this.filterLenguajes)
      return this.filterLenguajes
    }else{
console.log('en el else')
    return this.lenguajeService.lenguajes

    }

  }
  */


  /**
   *   filtradoLenguajes(inputData:string):Lenguaje[]{
console.log(this.filterLenguajes)
    if(this.inputValue && this.inputValue !== undefined){
       this.inputValue.pipe(
        first(),
        filter(value => value.length >=3),
        map(filter => {
          if(filter){
            this.filterLenguajes = this.lenguajeService.lenguajes.filter(lenguaje => lenguaje.nombre.includes(inputData) ||
                                                                                      lenguaje.categoria.includes(inputData) ||
                                                                                      lenguaje.tipo.includes(inputData) )
          }
        }),
        tap(()=>{
          //Por qué no se ejecutan las salidas de consola?
          // console.log(this.filterValue)
          console.log(this.filterLenguajes)
          console.log
        })
       )
       .subscribe(filterValues=> this.filterLenguajes=filterValues!)

       return this.filterLenguajes

    }else{
      return this.lenguajes
    }

  }
   */

  ngOnInit(): void {
/**
 * //1. suscribirme al input para obtener los valores y guardarlos en la variable filterValue
this.inputValue.pipe(
  first(),
  tap(()=>{
    console.log('inicio el componente')
  })
  )
  .subscribe((value)=>{
    // this.filterValue = value;
    this.filtradoLenguajes(value)
  })
 */

  }

 /**
  *  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    this.input.pipe(
      first()
    ).subscribe()
  }
  */
}

