import { Usuario } from './usuario.model';

export interface Sobre {
  _id: string;
  concepto: string;
  cantidad: number;
  published_at: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  usuario: Usuario;
  pagos: Pagos[];
  id: string;
  pagado: boolean; // Si está pagado, simplemente no mostrarlo
}


class Pagos {
  fecha: Date;
  // Es el monto que se pagó especificamente en ese mes/fecha, no es referencial al atributo cantidad
  cantidad: number;
}
