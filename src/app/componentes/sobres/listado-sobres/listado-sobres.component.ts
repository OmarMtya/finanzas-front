import { Component, OnInit, OnDestroy } from '@angular/core';
import { Sobre } from '../../../models/sobre.model';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/app.store';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { updateSobre, getSobres } from '../../../store/actions/app.actions';

@Component({
  selector: 'app-listado-sobres',
  templateUrl: './listado-sobres.component.html',
  styleUrls: ['./listado-sobres.component.sass']
})
export class ListadoSobresComponent implements OnInit, OnDestroy {

  sobres: Sobre[];
  subs: Subscription[] = [];

  constructor(
    private store: Store<AppState>
  ) {
    this.subs[0] = this.store.select('app').pipe(map((x) => x.sobres)).subscribe(sobres => this.sobres = sobres);
  }

  ngOnDestroy(): void {
    this.subs.forEach(element => {
      element.unsubscribe();
    });
  }

  ngOnInit(): void {
    this.store.dispatch(getSobres());
  }

  pagado(sobre: Sobre) {
    let pagos;
    if (sobre.pagos) {
      pagos = [...sobre.pagos, { fecha: new Date(), cantidad: sobre.cantidad }];
    } else {
      pagos = [{ fecha: new Date(), cantidad: sobre.cantidad }];
    }

    this.store.dispatch(
      updateSobre({
        sobre: {
          ...sobre,
          pagos: pagos
        }
      })
    );
  }

  sinPagar(sobre: Sobre) {
    let pagos = [...sobre.pagos];
    pagos.splice(pagos.length - 1, 1);

    this.store.dispatch(
      updateSobre({
        sobre: {
          ...sobre,
          pagos: pagos
        }
      })
    );
  }

  contarSobresSinPagar(){
    return this.sobres.filter(sobre => sobre.pagos.length === 0).length;
  }

  contarSobresPagados(){
    return this.sobres.filter(sobre => sobre.pagos.length > 0).length;
  }
}
