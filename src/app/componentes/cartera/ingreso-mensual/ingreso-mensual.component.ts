import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.store';
import { Subscription } from 'rxjs';
import { Cartera } from '../../../models/cartera.model';
import { updateIngresoMensual } from 'src/app/store/actions/app.actions';
import { SharedService } from '../../../services/shared.service';

@Component({
  selector: 'app-ingreso-mensual',
  templateUrl: './ingreso-mensual.component.html',
  styleUrls: ['./ingreso-mensual.component.css']
})
export class IngresoMensualComponent implements OnInit, OnDestroy {

  form: FormGroup;
  subs: Subscription[] = [];
  cartera: Cartera;

  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>,
    private shared: SharedService
  ) {
    this.form = this.fb.group({
      ingreso: new FormControl(this.cartera?.ingreso_mensual || '', [Validators.required]),
    });

    this.subs[0] = this.store.select('app').subscribe(x => {
      this.cartera = x.cartera;
      if(x.cartera) {
        this.form.patchValue({ ingreso: x.cartera.ingreso_mensual });
      }
    });
  }

  ngOnDestroy(): void {
    this.subs.forEach(sub => sub.unsubscribe());
  }

  ngOnInit(): void {
  }

  enviar() {
    if (this.form.invalid) {
      this.shared.enviarAlerta('warning', 'Error', 'Verifique los datos ingresados');
      return;
    }
    this.store.dispatch(updateIngresoMensual({ cartera: this.cartera, valor: this.form.value.ingreso }));
  }
}
