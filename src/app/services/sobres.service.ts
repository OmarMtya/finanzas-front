import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { AppService } from './app.service';
import { Sobre } from '../models/sobre.model';

@Injectable({
  providedIn: 'root'
})
export class SobresService {

  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private app: AppService
  ) { }

  postSobre(concepto: string, cantidad: number) {
    return this.http.post(this.app.getRuta(`/sobres`), {
      concepto,
      cantidad,
      usuario: this.auth.getUsuario().id
    });
  }

  getSobres() {
    return this.http.get(this.app.getRuta(`/sobres?usuario=${this.auth.getUsuario().id}`));
  }

  updateSobre(sobre: Sobre) {
    return this.http.put(this.app.getRuta(`/sobres/${sobre.id}`), sobre);
  }

  deleteSobre(id: string) {
    return this.http.delete(this.app.getRuta(`/sobres/${id}`));
  }
}
