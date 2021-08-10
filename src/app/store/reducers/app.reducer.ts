import { createReducer, on } from '@ngrx/store';
import * as appActions from '../actions/app.actions';
import { Sobre } from '../../models/sobre.model';
import { updateSobre } from '../../../../../finanzas-front/src/app/store/actions/app.actions';

export interface AppRState {
  sobres: Sobre[];
  cargando: boolean;
  error: any;
};

const initialState: AppRState = {
  error: null,
  cargando: false,
  sobres: [],
};

export const appreducer = createReducer(
  initialState,
  on(appActions.failure, (state, { error }) => ({
    ...state,
    error: { ...error }
  })),
  on(appActions.getSobres, (state,) => ({
    ...state,
    cargando: true,
  })),
  on(appActions.getSobresSuccess, (state, { sobres }) => ({
    ...state,
    cargando: false,
    sobres: [ ...sobres ]
  })),
  on(appActions.updateSobre, (state) => ({
    ...state,
    cargando: true,
    error: null
  })),
  on(appActions.updateSobreSuccess, (state) => ({
    ...state,
    cargando: false,
  })),
  on(appActions.deleteSobre, (state) => ({
    ...state,
    cargando: true,
    error: null
  })),
  on(appActions.deleteSobreSuccess, (state) => ({
    ...state,
    cargando: false,
  })),
);
