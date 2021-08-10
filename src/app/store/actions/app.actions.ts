import { props, createAction } from '@ngrx/store';
import { Sobre } from '../../models/sobre.model';

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

export const failure = createAction(
  '[App] Failure',
  props<{ error: any }>()
);
