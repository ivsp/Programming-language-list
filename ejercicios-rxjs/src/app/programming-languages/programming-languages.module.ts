import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TableComponent } from './components/table/table.component';
import { FooterComponent } from './components/footer/footer.component';
import { FilterComponent } from './components/filter/filter.component';
import { AddLanguageModalComponent } from './components/add-language-modal/add-language-modal.component';
import { FormsModule } from '@angular/forms';
import { ProgrammingLanguageService } from '../programming-language-service.service';



@NgModule({
  declarations: [
    FilterComponent,
    TableComponent,
    FooterComponent,
    AddLanguageModalComponent
  ],
  imports: [
    CommonModule,

  ],
  exports:[
    FilterComponent,
    TableComponent,
    FooterComponent,
    AddLanguageModalComponent

  ],
  providers:[
    ProgrammingLanguageService
  ]
})
export class ProgrammingLanguagesModule { }
