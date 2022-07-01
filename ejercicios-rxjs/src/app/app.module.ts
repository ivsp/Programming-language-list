import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ProgrammingLanguageService } from './service/programming-language-service.service';
import { ProgrammingLanguagesModule } from './programming-languages/programming-languages.module';



@NgModule({
  declarations: [
    AppComponent,




  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    ProgrammingLanguagesModule

  ],
  providers: [
    ProgrammingLanguageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
