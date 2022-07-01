import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { auditTime, concatMap, debounceTime, distinctUntilChanged, exhaustMap, fromEvent, map, Observable, switchMap, tap } from 'rxjs';
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
      //poner un switch map que llame a la funcion que cambia el valor del input
      //en el servicio
      tap(a =>console.log('antes de actualizar el input',a)),

      //switchMap((search)=>this.lenguajeService.cambiarInput(search)!),
      switchMap((search)=>this.lenguajeService.filtradoLenguajes(search)),
      tap(a =>console.log('despues de actualiazar el input',a)),

      //map((search)=>this.lenguajeService.filtradoLenguajes(search)),
      tap(a =>console.log('despues de actualizar el array filtrado',a)),

      tap(x=>{
        console.log(x)
       // console.log(this.lenguajeService.input)
      }),
      auditTime(1000)
    )
    .subscribe()
  }


}
