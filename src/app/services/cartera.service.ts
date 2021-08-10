import { Injectable } from '@angular/core';
import { AppService } from './app.service';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { Cartera } from '../models/cartera.model';

@Injectable({
  providedIn: 'root'
})
export class CarteraService {

  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private app: AppService
  ) { }

  getCartera() {
    return this.http.get(this.app.getRuta(`/carteras?usuario=${this.auth.getId()}`));
  }

  putConcepto(cartera: Cartera, nombre: string, descripcion: string, valor: number, tipo) {
    return this.http.put(this.app.getRuta(`/carteras/${cartera.id}`), {
      conceptos: [
        ...cartera.conceptos,
        {
          nombre,
          descripcion,
          valor,
          __component: tipo
        }
      ]
    });
  }

  deleteConcepto(cartera: Cartera, concepto: string,) {
    return this.http.put(this.app.getRuta(`/carteras/${cartera.id}`), {
      conceptos: [
        ...cartera.conceptos.filter(x => x.id !== concepto)
      ]
    });
  }

  putIngresoMensual(cartera: Cartera, valor: number) {
    return this.http.put(this.app.getRuta(`/carteras/${cartera.id}`), {
      ingreso_mensual: valor
    });
  }

}
