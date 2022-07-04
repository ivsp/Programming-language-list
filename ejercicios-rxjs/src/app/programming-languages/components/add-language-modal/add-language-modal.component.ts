import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgForm } from '@angular/forms';

import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { categorias, tipos, valoraciones } from 'src/app/common/data';
import { ProgrammingLanguageService } from 'src/app/service/programming-language-service.service';
import { Categoria, Tipo, Valoracion } from '../../interfaces/interfaces';

@Component({
  selector: 'app-add-language-modal',
  templateUrl: './add-language-modal.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./add-language-modal.component.css'],
})
export class AddLanguageModalComponent implements OnInit {
  closeResult = '';

  public categorias: Categoria[] = categorias;
  public tipos: Tipo[] = tipos;
  public valoraciones: Valoracion[] = valoraciones;

  constructor(
    private modalService: NgbModal,
    private languageService: ProgrammingLanguageService
  ) {}

  ngOnInit(): void {}

  addNewLenguage(formulario: NgForm) {
    console.log(formulario.value);
    this.languageService.addLanguage(formulario.value);
    formulario.resetForm();
  }

  open(content: any) {
    this.modalService.open(content, { centered: true }).result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      }
    );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
