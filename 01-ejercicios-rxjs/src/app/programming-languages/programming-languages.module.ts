import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterComponent } from './components/filter/filter.component';
import { TableComponent } from './components/table/table.component';
import { FooterComponent } from './components/footer/footer.component';



@NgModule({
  declarations: [
    FilterComponent,
    TableComponent,
    FooterComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    FilterComponent,
    TableComponent,
    FooterComponent
  ]
})
export class ProgrammingLanguagesModule { }
