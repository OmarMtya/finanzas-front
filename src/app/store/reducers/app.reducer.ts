import { createReducer, on } from '@ngrx/store';
import * as appActions from '../actions/app.actions';
import { Sobre } from '../../models/sobre.model';
import { updateSobre } from '../../../../../finanzas-front/src/app/store/actions/app.actions';
import { Cartera } from '../../models/cartera.model';

export interface AppRState {
  sobres: Sobre[];
  cargando: boolean;
  cartera: Cartera;
  error: any;
};

const initialState: AppRState = {
  error: null,
  cargando: false,
  sobres: [],
  cartera: null,
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
    sobres: [...sobres]
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
  on(appActions.getCartera, (state) => ({
    ...state,
    cargando: true,
    error: null
  })),
  on(appActions.getCarteraSuccess, (state, { cartera }) => ({
    ...state,
    cargando: false,
    cartera: { ...cartera }
  })),
  on(appActions.putConcepto, (state) => ({
    ...state,
    cargando: true,
    error: null
  })),
  on(appActions.putConceptoSuccess, (state, { cartera }) => ({
    ...state,
    cargando: false,
    cartera: { ...cartera }
  })),
  on(appActions.deleteConcepto, (state) => ({
    ...state,
    cargando: true,
    error: null
  })),
  on(appActions.deleteConceptoSuccess, (state, { cartera }) => ({
    ...state,
    cargando: false,
    cartera: { ...cartera }
  })),
  on(appActions.updateIngresoMensual, (state) => ({
    ...state,
    cargando: true,
    error: null
  })),
  on(appActions.updateIngresoMensualSuccess, (state, { cartera }) => ({
    ...state,
    cargando: false,
    cartera: { ...cartera }
  })),
);
