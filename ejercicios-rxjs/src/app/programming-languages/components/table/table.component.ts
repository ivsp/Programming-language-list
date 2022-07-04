import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ProgrammingLanguageService } from '../../../service/programming-language-service.service';
import { Language, Valoracion } from '../../interfaces/interfaces';
import { fromEvent, Observable } from 'rxjs';
import { valoraciones } from 'src/app/common/data';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnInit {
  @ViewChild('nameFieldAsc') nameFieldAsc!: ElementRef;
  @ViewChild('nameFieldDes') nameFieldDes!: ElementRef;
  @ViewChild('categoryFieldAsc') categoryFieldAsc!: ElementRef;
  @ViewChild('categoryFieldDes') categoryFieldDes!: ElementRef;
  @ViewChild('typeFieldAsc') typeFieldAsc!: ElementRef;
  @ViewChild('typeFieldDes') typeFieldDes!: ElementRef;
  @ViewChild('valueFieldAsc') valueFieldAsc!: ElementRef;
  @ViewChild('valueFieldDes') valueFieldDes!: ElementRef;

  languages$!: Observable<Language[]>;

  values: Valoracion[] = valoraciones;
  constructor(private languageService: ProgrammingLanguageService) {}

  //Creo un observable que emite valores y se suscribe a cada valor
  sortDataByName(order: boolean) {
    fromEvent(this.nameFieldAsc.nativeElement, 'click')
      .pipe()
      .subscribe(() => {
        this.languageService.sortByName(order);
      });

    fromEvent(this.nameFieldDes.nativeElement, 'click')
      .pipe()
      .subscribe(() => {
        this.languageService.sortByName(order);
      });
  }

  sortDataByCategory(order: boolean) {
    fromEvent(this.categoryFieldAsc.nativeElement, 'click')
      .pipe()
      .subscribe(() => {
        this.languageService.sortByCategory(order);
      });
    fromEvent(this.categoryFieldDes.nativeElement, 'click')
      .pipe()
      .subscribe(() => {
        this.languageService.sortByCategory(order);
      });
  }

  sortDataByType(order: boolean) {
    fromEvent(this.typeFieldAsc.nativeElement, 'click')
      .pipe()
      .subscribe(() => {
        this.languageService.sortByType(order);
      });
    fromEvent(this.typeFieldDes.nativeElement, 'click')
      .pipe()
      .subscribe(() => {
        this.languageService.sortByType(order);
      });
  }

  sortDataByValoration(order: boolean) {
    fromEvent(this.valueFieldAsc.nativeElement, 'click')
      .pipe()
      .subscribe(() => {
        this.languageService.sortByValoration(order);
      });
    fromEvent(this.valueFieldDes.nativeElement, 'click')
      .pipe()
      .subscribe(() => {
        this.languageService.sortByValoration(order);
      });
  }

  ngOnInit(): void {
    this.languages$ = this.languageService.languages$;
  }
}
