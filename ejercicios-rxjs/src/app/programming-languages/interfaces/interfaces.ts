import { categorias } from '../../common/data';
export interface Categoria {
  categoria:string
}

export interface Tipo {
  tipo: string
}

export interface Valoracion{
  valoracion: number,
  descripcion: string
}

export interface Lenguaje{
  id: number,
  nombre: string,
  categoria: string,
  tipo: string,
  valoracion: number

}
