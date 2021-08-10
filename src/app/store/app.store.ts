import { ActionReducerMap } from '@ngrx/store';
import { authreducer, AuthState } from './reducers/auth.reducer';
import { appreducer, AppRState } from './reducers/app.reducer';

export interface AppState {
  auth: AuthState;
  app: AppRState;
}

export const appReducers: ActionReducerMap<AppState> = {
  auth: authreducer,
  app: appreducer
}
