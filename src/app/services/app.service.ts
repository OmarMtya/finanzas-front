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

  getRuta(ruta: string) {
    return `${environment.servidor}${ruta}`;
  }
}
