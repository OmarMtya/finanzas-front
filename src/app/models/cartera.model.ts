import { Usuario } from './usuario.model';

export interface Cartera {
  _id: string;
  published_at: string;
  conceptos: Concepto[];
  createdAt: string;
  updatedAt: string;
  __v: number;
  usuario: Usuario;
  ingreso_mensual: number;
  id: string;
}


interface Concepto {
  __component: string;
  _id: string;
  nombre: string;
  descripcion: string;
  valor: number;
  __v: number;
  id: string;
}
