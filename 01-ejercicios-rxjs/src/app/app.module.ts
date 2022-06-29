import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ProgrammingLanguagesComponent } from './programming-languages/programming-languages.component';

@NgModule({
  declarations: [
    AppComponent,
    ProgrammingLanguagesComponent
  ],
  imports: [
    BrowserModule,
    ProgrammingLanguagesComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
