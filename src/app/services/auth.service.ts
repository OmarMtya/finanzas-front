import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Usuario } from '../models/usuario.model';
import { cerrarSesion, getMe, llenarSesion } from '../store/actions/auth.actions';
import { AppState } from '../store/app.store';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  auth = false;

  constructor(
    private http: HttpClient,
    private store: Store<AppState>,
    private router: Router,
  ) {
    this.store.select('auth').subscribe((x) => this.auth = x.usuario ? true : false);
  }

  login(correo: string, password: string): Observable<any> {
    const formData = new FormData();
    formData.append('identifier', correo);
    formData.append('password', password);
    return this.http.post(this.getRuta(`auth/local`), formData);
  }

  registrar(correo: string, password: string): Observable<any> {
    const formData = new FormData();
    formData.append('email', correo);
    formData.append('password', password);
    return this.http.post(this.getRuta(`auth/local/register`), formData);
  }

  actualizarUsuario(usuario: Usuario) {
    // const form = new FormData();
    // form.append('nombre', usuario.nombre);
    // form.append('email', usuario.email);
    // if (usuario.password) {
    //   form.append('password', usuario.password);
    // }
    return this.http.put(this.getRuta(`users/${this.getId()}`), {});
  }

  isAuthCheck() {
    const token = localStorage.getItem('token');
    if (!token) { // No tiene token
      return false;
    }
    return true;
  }

  isAuth() {
    const token = localStorage.getItem('token');
    const usuario = localStorage.getItem('usuario');
    if (!token) { // No tiene token
      this.logout();
      return false;
    }

    const helper = new JwtHelperService();
    const isExpired = helper.isTokenExpired(token);

    if (!isExpired) { // Si no está expirado el token
      if (!this.auth) {
        this.store.dispatch(llenarSesion({ usuario: this.getUsuario() })); // Lleno la sesión para evitar errores
        this.store.dispatch(getMe()); // Traigo la información del usuario
      }
      return true;
    }

    this.logout(); // Token expirado
    return false;
  }

  /**
   *
   * @param analizar - Bandera que analiza si necesita enviar a logout si no existe el usuario
   * @returns
   */
  getUsuario(analizar = true) {
    let usuario = localStorage.getItem('usuario');
    if (!usuario) {
      if (analizar) {
        this.logout();
      }
      return null;
    }
    const usuarioObj: Usuario = JSON.parse(usuario);
    usuario = Object.setPrototypeOf(usuario, Usuario.prototype);
    return usuarioObj;
  }

  getId() {
    // eslint-disable-next-line no-underscore-dangle
    return this.getUsuario()._id;
  }

  logout() {
    this.store.dispatch(cerrarSesion()); // Limpia el store de Auth
  }

  getToken() {
    const token = localStorage.getItem('token');
    return token;
  }

  getMe() {
    return this.http.get(this.getRuta(`users/me`));
  }

  verificarNecesitaLogin() {
    const token = localStorage.getItem('token');
    const usuario = localStorage.getItem('usuario');
    if (token && usuario) {
      this.router.navigate(['/admin']);
      return false;
    }
    return true;
  }

  private getRuta(ruta: string) {
    return `${environment.servidor}/${ruta}`;
  }

  // esAdmin() {
  //   return this.getUsuario(false)?.role.type == 'authenticated';
  // }
}
