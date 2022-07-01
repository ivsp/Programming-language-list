import { Component, OnInit } from '@angular/core';
import { debounceTime, filter } from 'rxjs';
import { Categoria, Tipo, Valoracion } from '../../interfaces/interfaces';
import { categorias, tipos, valoraciones } from 'src/app/common/data';
import { ProgrammingLanguageService } from 'src/app/service/programming-language-service.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',

  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {

  public  categorias: Categoria[] = categorias;
  public  tipos: Tipo[] = tipos;
  public  valoraciones: Valoracion[] = valoraciones;
  form!: FormGroup;

  constructor(private languageService: ProgrammingLanguageService, private readonly builder: FormBuilder ) {   }

  openModal(){
    console.log('open modal')
  }

  ngOnInit() {
    this.form = this.builder.group({
    search: [''],
    categorySelect: [''],
    typeSelect: [''],
    valorationSelect: ['']
  });
    //El método valueChanges emite un valor del observable cada vez que el campo especificado cambia de valor
  this.form.get('search')?.valueChanges.pipe(
    debounceTime(1000),
    filter(value => !value || value.length >= 3 || value.length === 0),
    ).subscribe(value => {
      console.log('new value', value);
      this.languageService.filterLanguajes(value);
      }
    );
  }

}
