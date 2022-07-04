import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TableComponent } from './components/table/table.component';
import { FooterComponent } from './components/footer/footer.component';
import { FilterComponent } from './components/filter/filter.component';
import { AddLanguageModalComponent } from './components/add-language-modal/add-language-modal.component';
import { ProgrammingLanguageService } from '../service/programming-language-service.service';
import { ProgrammingLanguagesComponent } from './programming-languages.component';

//PrimeNG
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { NgbDropdownModule, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    FilterComponent,
    TableComponent,
    FooterComponent,
    AddLanguageModalComponent,
    ProgrammingLanguagesComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    NgbDropdownModule,
    NgbModalModule,
  ],
  exports: [
    FilterComponent,
    TableComponent,
    FooterComponent,
    AddLanguageModalComponent,
    ProgrammingLanguagesComponent,
  ],
  providers: [ProgrammingLanguageService],
})
export class ProgrammingLanguagesModule {}
