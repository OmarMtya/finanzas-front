import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as appActions from '../actions/app.actions';
import { AppService } from '../../services/app.service';
import { switchMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { Sobre } from '../../models/sobre.model';
import { Store } from '@ngrx/store';
import { AppState } from '../app.store';
import { getSobres, getCartera } from '../actions/app.actions';
import { SobresService } from '../../services/sobres.service';
import { CarteraService } from '../../services/cartera.service';
import { Cartera } from '../../models/cartera.model';

@Injectable({
  providedIn: 'root'
})
export class AppEffects {
  constructor(
    private actions$: Actions,
    private sobresService: SobresService,
    private carteraService: CarteraService,
    private store: Store<AppState>
  ) { }

  postSobre$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(appActions.postSobre),
      switchMap(({ concepto, cantidad }) =>
        this.sobresService.postSobre(concepto, cantidad).pipe(
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
        this.sobresService.getSobres().pipe(
          map((data: Sobre[]) => appActions.getSobresSuccess({ sobres: data })),
          catchError(error => of(appActions.failure({ error }))))
      ),
    );
  });

  updateSobre$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(appActions.updateSobre),
      switchMap(({ sobre }) =>
        this.sobresService.updateSobre(sobre).pipe(
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
        this.sobresService.deleteSobre(id).pipe(
          map((data: Sobre) => {
            this.store.dispatch(getSobres());
            return appActions.deleteSobreSuccess({ sobre: data });
          }),
          catchError(error => of(appActions.failure({ error }))))
      ),
    );
  });


  getCartera$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(appActions.getCartera),
      switchMap(() =>
        this.carteraService.getCartera().pipe(
          map((data: Cartera[]) => appActions.getCarteraSuccess({ cartera: data[0] })),
          catchError(error => of(appActions.failure({ error }))))
      ),
    );
  });

  putConcepto$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(appActions.putConcepto),
      switchMap(({ cartera, nombre, descripcion, valor, tipo }) =>
        this.carteraService.putConcepto(cartera, nombre, descripcion, valor, tipo).pipe(
          map((data: Cartera) => {
            return appActions.putConceptoSuccess({ cartera: data });
          }),
          catchError(error => of(appActions.failure({ error }))))
      ),
    );
  });

  deleteConcepto$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(appActions.deleteConcepto),
      switchMap(({ cartera, concepto }) =>
        this.carteraService.deleteConcepto(cartera, concepto).pipe(
          map((data: Cartera) => {
            return appActions.deleteConceptoSuccess({ cartera: data });
          }),
          catchError(error => of(appActions.failure({ error }))))
      ),
    );
  });

  updateIngresoMensual$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(appActions.updateIngresoMensual),
      switchMap(({ cartera, valor }) =>
        this.carteraService.putIngresoMensual(cartera, valor).pipe(
          map((data: Cartera) => appActions.updateIngresoMensualSuccess({ cartera: data })),
          catchError(error => of(appActions.failure({ error }))))
      ),
    );
  });

}
