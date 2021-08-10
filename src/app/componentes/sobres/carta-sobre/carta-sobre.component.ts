import { Component, Input, OnInit } from '@angular/core';
import { Sobre } from 'src/app/models/sobre.model';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/app.store';
import { deleteSobre } from '../../../store/actions/app.actions';
import { SharedService } from '../../../services/shared.service';


@Component({
  selector: 'app-carta-sobre',
  templateUrl: './carta-sobre.component.html',
  styleUrls: ['./carta-sobre.component.sass']
})
export class CartaSobreComponent implements OnInit {

  @Input() sobre: Sobre;
  @Input() funcion: Function;
  @Input() mensaje: string;
  @Input() icono: string;

  constructor(
    private store: Store<AppState>, // Es necesaria el inyectado de la store, para que el delegado de función, pueda hacer el dispatch
    private shared: SharedService
  ) { }

  ngOnInit(): void {
  }

  eliminar() {
    this.shared.enviarConfirmacion('warning', '¿Está seguro que desea eliminar este elemento?', 'Eliminar').then((resp) => {
      if (resp.isConfirmed) {
        this.store.dispatch(deleteSobre({ id: this.sobre.id }));
      }
    });
  }

}
