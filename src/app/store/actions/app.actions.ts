import { props, createAction } from '@ngrx/store';
import { Sobre } from '../../models/sobre.model';
import { Cartera } from '../../models/cartera.model';

export const postSobre = createAction(
  '[App] Post Sobre',
  props<{ concepto: string, cantidad: number }>()
);

export const postSobreSuccess = createAction(
  '[App] Post Sobre Success',
  props<{ sobre: Sobre }>()
);

export const getSobres = createAction(
  '[App] Get Sobres',
);

export const getSobresSuccess = createAction(
  '[App] Get Sobres Success',
  props<{ sobres: Sobre[] }>()
);

export const updateSobre = createAction(
  '[App] Update Sobre',
  props<{ sobre: Sobre }>()
);

export const updateSobreSuccess = createAction(
  '[App] Update Sobre Success',
  props<{ sobre: Sobre }>()
);

export const deleteSobre = createAction(
  '[App] Delete Sobre',
  props<{ id: string }>()
);

export const deleteSobreSuccess = createAction(
  '[App] Delete Sobre Success',
  props<{ sobre: Sobre }>()
);

export const getCartera = createAction(
  '[App] Get Cartera',
);

export const getCarteraSuccess = createAction(
  '[App] Get Cartera Success',
  props<{ cartera: Cartera }>()
);

export const putConcepto = createAction(
  '[App] Put Concepto',
  props<{ cartera: Cartera, nombre: string, descripcion: string, valor: number, tipo: string }>()
);

export const putConceptoSuccess = createAction(
  '[App] Put Concepto Success',
  props<{ cartera: Cartera }>()
);

export const deleteConcepto = createAction(
  '[App] Delete Concepto',
  props<{ cartera: Cartera, concepto: string }>()
);

export const deleteConceptoSuccess = createAction(
  '[App] Delete Concepto Success',
  props<{ cartera: Cartera }>()
);

export const updateIngresoMensual = createAction(
  '[App] Update ingreso Mensual',
  props<{ cartera: Cartera, valor: number }>()
);

export const updateIngresoMensualSuccess = createAction(
  '[App] Update ingreso Mensual Success',
  props<{ cartera: Cartera }>()
);

export const failure = createAction(
  '[App] Failure',
  props<{ error: any }>()
);
