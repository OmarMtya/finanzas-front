import { Component, OnInit } from '@angular/core';
import { AppState } from '../../../store/app.store';
import { Store } from '@ngrx/store';
import { Cartera } from '../../../models/cartera.model';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { deleteConcepto } from '../../../store/actions/app.actions';
import { SharedService } from '../../../services/shared.service';

@Component({
  selector: 'app-lista-conceptos',
  templateUrl: './lista-conceptos.component.html',
  styleUrls: ['./lista-conceptos.component.css']
})
export class ListaConceptosComponent implements OnInit {

  subs: Subscription[] = [];
  cartera: Cartera;

  constructor(
    private store: Store<AppState>,
    private shared: SharedService
  ) {
    this.subs[0] = this.store.select('app').pipe(map((x) => x.cartera)).subscribe((cartera) => this.cartera = cartera);
  }

  ngOnDestroy(): void {
    this.subs.forEach(sub => sub.unsubscribe());
  }

  ngOnInit(): void {

  }

  eliminar(concepto: { id: string }) {
    this.shared.enviarConfirmacion('warning', 'Eliminar Concepto', '¿Está seguro que desea eliminar este concepto?').then((resp) => {
      if (resp.isConfirmed) {
        this.store.dispatch(deleteConcepto({ cartera: this.cartera, concepto: concepto.id }));
      }
    });
  }

}
