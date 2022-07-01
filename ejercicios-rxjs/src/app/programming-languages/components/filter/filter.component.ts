import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { auditTime, concatMap, debounceTime, distinctUntilChanged, exhaustMap, fromEvent, map, Observable, switchMap, tap, filter } from 'rxjs';
import { Categoria, Tipo, Valoracion, Lenguaje } from '../../interfaces/interfaces';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { categorias, tipos, valoraciones } from 'src/app/common/data';
import { ProgrammingLanguageService } from 'src/app/programming-language-service.service';

//PrimeNG


@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',

  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {


  public  categorias: Categoria[] = categorias;
  public  tipos: Tipo[] = tipos;
  public  valoracion: Valoracion[] = valoraciones;



  @ViewChild('searchInput') input!: ElementRef;

  constructor(private lenguajeService: ProgrammingLanguageService ) {   }


openModal(){

console.log('open modal')
}
print(){
  console.log(this.input)
}



  ngOnInit() {

  }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.

    fromEvent<any>(this.input.nativeElement, 'keyup')
    .pipe(
      tap(a =>console.log('antes del map',a)),
      map((e) => e.target.value),
      tap(a =>console.log('despues del map',a)),
      debounceTime(1000),
      tap(a =>console.log('despues del debounce',a)),
      distinctUntilChanged(),
      //ejecutar la condicion de si el input es mayor a 3 caracteres
      tap(a =>console.log('antes de filtrar el input',a)),

      filter(input => input.length>=3),
      tap(a =>console.log('despues de filtrar el input',a)),

      //Hago la llamada a la función de filtrar dentro del subscribe
      //switchMap((search)=>this.lenguajeService.filtradoLenguajes(search)),
    )
    .subscribe((input)=>this.lenguajeService.filtradoLenguajes(input))
  }


}
