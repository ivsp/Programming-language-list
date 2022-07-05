import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { categorias, tipos, valoraciones } from 'src/app/common/data';
import { ProgrammingLanguageService } from 'src/app/service/programming-language-service.service';
import { Category, Type, Valoration } from '../../interfaces/interfaces';

@Component({
  selector: 'app-add-language-modal',
  templateUrl: './add-language-modal.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./add-language-modal.component.css'],
})
export class AddLanguageModalComponent implements OnInit {
  closeResult = '';

  public categorias: Category[] = categorias;
  public tipos: Type[] = tipos;
  public valoraciones: Valoration[] = valoraciones;
  public languageFormData!: FormGroup;

  constructor(
    private modalService: NgbModal,
    private languageService: ProgrammingLanguageService,
    private readonly builder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.languageFormData = this.builder.group({
      //['Valor inicia',validadores sincronos, validadores asincronos]
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      categoria: ['', [Validators.required, Validators.minLength(3)]],
      tipo: ['', Validators.required],
      valoracion: ['', Validators.required],
    });
  }

  addNewLenguage(formData: FormGroup) {
    if (formData.invalid) {
      //para gestionar los errores del formulario
      //this.languageFormData.markAllAsTouched();
      return;
    }

    this.languageService.addLanguage(formData.value);
    this.languageFormData.reset();
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

  fieldIsValid(field: string) {
    return (
      this.languageFormData.controls[`${field}`].errors &&
      this.languageFormData.controls[`${field}`].touched
    );
  }
}
