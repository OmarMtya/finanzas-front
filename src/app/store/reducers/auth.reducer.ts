import { createReducer, on } from '@ngrx/store';
import { Usuario } from '../../models/usuario.model';
import * as auth from '../actions/auth.actions';

export interface AuthState {
  token: string;
  usuario: Usuario;
  cargando: boolean;
  error: any;
};

const initialState: AuthState = {
  token: null,
  usuario: null,
  cargando: false,
  error: null
};

export const authreducer = createReducer(
  initialState,
  on(auth.login, (state) => ({
    ...state,
    cargando: true,
    error: null,
  })),
  on(auth.loginSuccess, (state, { jwt }) => ({
    ...state,
    cargando: false,
    token: jwt,
    // usuario: { ...usuario, role: { ...usuario.role } }
  })),
  on(auth.loginFailure, (state, { error }) => ({
    ...state,
    cargando: false,
    error: { ...error }
  })),
  on(auth.cerrarSesion, (state) => ({
    ...initialState
  })),
  on(auth.llenarSesion, (state, { usuario }) => ({
    ...state,
    usuario: { ...usuario }
  })),
  on(auth.getMe, (state) => ({
    ...state,
    error: null,
    // cargando: true
  })),
  on(auth.getMeSuccess, (state, { usuario }) => ({
    ...state,
    // cargando: false,
    usuario: { ...usuario }
  })),
  on(auth.getMeFailure, (state, { error }) => ({
    ...state,
    // cargando: false,
    usuario: null,
    error: { ...error }
  })),
);
