import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FilterComponent } from './programming-languages/components/filter/filter.component';
import { FooterComponent } from './programming-languages/components/footer/footer.component';
import { TableComponent } from './programming-languages/components/table/table.component';
import { ProgrammingLanguagesComponent } from './programming-languages/programming-languages.component';


//PrimeNg
import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import {SplitButtonModule} from 'primeng/splitbutton';
import {MenuModule} from 'primeng/menu';
import {DropdownModule} from 'primeng/dropdown';
import { AddLanguageModalComponent } from './programming-languages/components/add-language-modal/add-language-modal.component';
import { ProgrammingLanguageService } from './programming-language-service.service';



@NgModule({
  declarations: [
    AppComponent,
    ProgrammingLanguagesComponent,
    FilterComponent,
    FooterComponent,
    TableComponent,
    AddLanguageModalComponent


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    //PrimeNg
    InputTextModule,
    ButtonModule,
    SplitButtonModule,
    MenuModule,
    DropdownModule,
    FormsModule,

  ],
  providers: [
    ProgrammingLanguageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
