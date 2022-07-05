import {
  Category,
  Language,
  Type,
  Valoration,
} from '../programming-languages/interfaces/interfaces';

export const categorias: Category[] = [
  { categoria: 'Front' },
  { categoria: 'Backend' },
  { categoria: 'Mobile' },
  { categoria: 'Full Stack' },
  { categoria: 'Scripting' },
];

export const tipos: Type[] = [{ tipo: 'Tipado' }, { tipo: 'No Tipado' }];

export const valoraciones: Valoration[] = [
  { valoracion: 1, descripcion: 'mayor que 1' },
  { valoracion: 2, descripcion: 'mayor que 2' },
  { valoracion: 3, descripcion: 'mayor que 3' },
  { valoracion: 4, descripcion: 'mayor que 4' },
  { valoracion: 5, descripcion: 'mayor que 5' },
  { valoracion: 6, descripcion: 'mayor que 6' },
  { valoracion: 7, descripcion: 'mayor que 7' },
  { valoracion: 8, descripcion: 'mayor que 8' },
  { valoracion: 9, descripcion: 'mayor que 9' },
  { valoracion: 10, descripcion: 'igual a 10' },
];

export const datosIniciales: Language[] = [
  {
    id: 1,
    nombre: 'Java Script',
    categoria: 'Full Stack',
    tipo: 'No Tipado',
    valoracion: 7,
  },
  {
    id: 2,
    nombre: 'Phyton',
    categoria: 'Backend',
    tipo: 'Tipado',
    valoracion: 9,
  },
  {
    id: 3,
    nombre: 'Java',
    categoria: 'Backend',
    tipo: 'Tipado',
    valoracion: 8,
  },
  {
    id: 4,
    nombre: 'C++',
    categoria: 'Full Stack',
    tipo: 'Tipado',
    valoracion: 7,
  },
  {
    id: 5,
    nombre: 'PHP',
    categoria: 'Backend',
    tipo: 'No Tipado',
    valoracion: 5,
  },
];
