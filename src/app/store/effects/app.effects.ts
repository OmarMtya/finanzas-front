import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as appActions from '../actions/app.actions';
import { AppService } from '../../services/app.service';
import { switchMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { Sobre } from '../../models/sobre.model';
import { Store } from '@ngrx/store';
import { AppState } from '../app.store';
import { getSobres } from '../actions/app.actions';

@Injectable({
  providedIn: 'root'
})
export class AppEffects {
  constructor(
    private actions$: Actions,
    private appService: AppService,
    private store: Store<AppState>
  ) { }

  postSobre$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(appActions.postSobre),
      switchMap(({ concepto, cantidad }) =>
        this.appService.postSobre(concepto, cantidad).pipe(
          map((data: any) => {
            this.store.dispatch(getSobres());
            return appActions.postSobreSuccess({ sobre: data });
          }),
          catchError(error => of(appActions.failure({ error }))))
      ),
    );
  });

  getSobres$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(appActions.getSobres),
      switchMap(() =>
        this.appService.getSobres().pipe(
          map((data: Sobre[]) => appActions.getSobresSuccess({ sobres: data })),
          catchError(error => of(appActions.failure({ error }))))
      ),
    );
  });

  updateSobre$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(appActions.updateSobre),
      switchMap(({ sobre }) =>
        this.appService.updateSobre(sobre).pipe(
          map((data: Sobre) => {
            this.store.dispatch(getSobres());
            return appActions.updateSobreSuccess({ sobre: data });
          }),
          catchError(error => of(appActions.failure({ error }))))
      ),
    );
  });

  deleteSobre$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(appActions.deleteSobre),
      switchMap(({ id }) =>
        this.appService.deleteSobre(id).pipe(
          map((data: Sobre) => {
            this.store.dispatch(getSobres());
            return appActions.deleteSobreSuccess({ sobre: data });
          }),
          catchError(error => of(appActions.failure({ error }))))
      ),
    );
  });

}
