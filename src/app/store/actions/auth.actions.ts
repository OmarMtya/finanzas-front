import { createAction, props } from '@ngrx/store';
import { Usuario } from '../../models/usuario.model';

export const login = createAction(
  '[Auth] Login',
  props<{
    email: string;
    password: string;
  }>()
);

export const loginSuccess = createAction(
  '[Auth] Login Success',
  props<{
    jwt: string;
    // usuario: Usuario
  }>()
);

export const loginFailure = createAction(
  '[Auth] Login Failure',
  props<{
    error: any;
  }>()
);

export const registrar = createAction(
  '[Auth] Registrar',
  props<{
    email: string;
    password: string;
    nombre: string;
  }>()
);

export const registrarSuccess = createAction(
  '[Auth] Registrar Success',
  props<{
    jwt: string;
    usuario: Usuario;
  }>()
);

export const registrarFailure = createAction(
  '[Auth] Registrar Failure',
  props<{
    error: any;
  }>()
);

export const cerrarSesion = createAction(
  '[Auth] Cerrar Sesion',
);

export const llenarSesion = createAction(
  '[Auth] Llenar Sesion',
  props<{
    usuario: Usuario;
  }>()
);

export const actualizarUsuario = createAction(
  '[Auth] Actualizar Usuario',
  props<{ usuario: Usuario }>()
);

export const actualizarUsuarioSuccess = createAction(
  '[Auth] Actualizar Usuario Success',
  props<{ usuario: Usuario }>()
);

export const actualizarUsuarioFailure = createAction(
  '[Auth] Actualizar Usuario Failure',
  props<{ error: any }>()
);

export const getMe = createAction(
  '[App] Get Me',
);

export const getMeSuccess = createAction(
  '[App] Get Me Success',
  props<{ usuario: Usuario }>()
);

export const getMeFailure = createAction(
  '[App] Get Me Failure',
  props<{ error: any }>()
);
