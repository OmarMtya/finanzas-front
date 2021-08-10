import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';
import { Sobre } from '../models/sobre.model';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(
    private http: HttpClient,
    private auth: AuthService
  ) { }

  postSobre(concepto: string, cantidad: number) {
    return this.http.post(this.getRuta(`/sobres`), {
      concepto,
      cantidad,
      usuario: this.auth.getUsuario().id
    });
  }

  getSobres() {
    return this.http.get(this.getRuta(`/sobres?usuario=${this.auth.getUsuario().id}`));
  }

  updateSobre(sobre: Sobre){
    return this.http.put(this.getRuta(`/sobres/${sobre.id}`), sobre);
  }

  deleteSobre(id: string){
    return this.http.delete(this.getRuta(`/sobres/${id}`));
  }

  getRuta(ruta: string) {
    return `${environment.servidor}${ruta}`;
  }
}
