import { createEffect, ofType, Actions } from '@ngrx/effects';
import * as authActions from '../actions/auth.actions';
import { Injectable } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { switchMap, map, catchError, tap } from 'rxjs/operators';
import { Usuario } from '../../models/usuario.model';
import { of } from 'rxjs';
import { AppState } from '../app.store';
import { getMe } from '../actions/auth.actions';


@Injectable({
  providedIn: 'root'
})
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router,
    private store: Store<AppState>
  ) { }

  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(authActions.login),
      switchMap(({ email, password }) =>
        this.authService.login(email, password).pipe(
          map((data: { jwt: string, user: Usuario }) => authActions.loginSuccess({ jwt: data.jwt })),
          catchError(error => of(authActions.loginFailure({ error }))))
      ),
    );
  });

  /**
   * Cuando hace login con otro provider, hace falta ejecutar getMe() porque solamente trae token
   */
  loginSuccess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(authActions.loginSuccess),
      tap(({ jwt }) => {
        localStorage.setItem('token', jwt);
        this.store.dispatch(authActions.getMe());
      }),
    );
  }, {
    dispatch: false
  });

  actualizarUsuario$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(authActions.actualizarUsuario),
      switchMap(({ usuario }) =>
        this.authService.actualizarUsuario(usuario).pipe(
          map((usuario: Usuario) => {
            localStorage.setItem('usuario', JSON.stringify(usuario));
            return authActions.actualizarUsuarioSuccess({ usuario });
          }),
          catchError(error => of(authActions.actualizarUsuarioFailure({ error }))))
      ),
    );
  });

  registrar$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(authActions.registrar),
      switchMap(({ email, password }) =>
        this.authService.registrar(email, password).pipe(
          map((data: { jwt: string, user: Usuario }) => {
            localStorage.setItem('token', data.jwt);
            localStorage.setItem('usuario', JSON.stringify(data.user));
            this.router.navigate(['/']);
            this.store.dispatch(getMe());
            return authActions.registrarSuccess({ usuario: data.user, jwt: data.jwt })
          }),
          catchError(error => of(authActions.registrarFailure({ error }))))
      ),
    );
  });



  getMe$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(authActions.getMe),
      switchMap(() =>
        this.authService.getMe().pipe(
          map((usuario: Usuario) => {
            localStorage.setItem('usuario', JSON.stringify(usuario));
            if (this.router.url.includes('login') || this.router.url.includes('register')) {
              this.router.navigate(['/admin']);
            }
            return authActions.getMeSuccess({ usuario })
          }),
          catchError(error => {
            setTimeout(() => {
              this.router.navigate(['/login']);
            }, 100);
            console.log("cerrando sesion");
            this.store.dispatch(authActions.cerrarSesion());
            return of(authActions.getMeFailure({ error }));
          }))
      ),
    );
  });

  cerrarSesion$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(authActions.cerrarSesion),
      tap(() => {
        localStorage.removeItem('token');
        localStorage.removeItem('usuario');
        localStorage.removeItem('error');
        this.router.navigate(['/login']);
      })
    );
  }, { dispatch: false });
}
