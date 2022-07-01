import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';

import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { categorias, tipos, valoraciones } from 'src/app/common/data';
import { ProgrammingLanguageService } from 'src/app/programming-language-service.service';
import { Categoria, Lenguaje, Tipo, Valoracion } from '../../interfaces/interfaces';

@Component({
  selector: 'app-add-language-modal',
  templateUrl: './add-language-modal.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./add-language-modal.component.css']
})
export class AddLanguageModalComponent implements OnInit {


  closeResult = '';

  public  categorias: Categoria[] = categorias;
  public  tipos: Tipo[] = tipos;
  public  valoraciones: Valoracion[] = valoraciones;


  get lenguajes():Lenguaje[]{
    return this.lenguajeService.lenguajes;
  }
 // lenguajes: Lenguaje[] =
  id : number = this.lenguajeService.lenguajes.length+1;

  @ViewChild('formulario') formulario!: NgForm;

  constructor(private modalService: NgbModal, private lenguajeService: ProgrammingLanguageService) {

  /**
   * Esta  forma de iniciar las variables en el constructor funciona, pero
   * voy a usar un get para manejar la información procedente del servicio
   */
    // this.lenguajes = lenguajeService.lenguajes;
    // this.id = lenguajeService.id;
  }

  ngOnInit(): void {
  }

  addNuevoLenguaje(formulario:NgForm){
    console.log(formulario.value)
    this.lenguajeService.añadirLenguaje(formulario.value)
    formulario.resetForm()

  }

  pintar(value:number){
console.log(value)
  }
  open(content:any) {
    this.modalService.open(content, { centered: true }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
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
