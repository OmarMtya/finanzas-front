import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../store/app.store';
import { getSobres, getCartera } from '../store/actions/app.actions';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  constructor(
    private store: Store<AppState>
  ) { }

  ejecutarAccionesPrincipales(event: { tab: string }) {
    switch (event.tab) {
      case 'tab1':
        this.store.dispatch(getSobres());
        break;
      case 'tab2': // En el resumen, hay que traerse todo de vuelta
        this.store.dispatch(getSobres());
        this.store.dispatch(getCartera());
        break;
      case 'tab3':
        this.store.dispatch(getCartera());
        break;
    }
  }

}
