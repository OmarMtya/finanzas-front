import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/app.store';
import { SharedService } from '../../../services/shared.service';
import { putConcepto } from 'src/app/store/actions/app.actions';
import { Subscription } from 'rxjs';
import { Cartera } from '../../../models/cartera.model';

@Component({
  selector: 'app-agregar-concepto',
  templateUrl: './agregar-concepto.component.html',
  styleUrls: ['./agregar-concepto.component.css']
})
export class AgregarConceptoComponent implements OnInit, OnDestroy {

  form: FormGroup;
  subs: Subscription[] = [];
  cartera: Cartera;

  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>,
    private shared: SharedService
  ) {
    this.form = this.fb.group({
      concepto: new FormControl('', [Validators.required]),
      descripcion: new FormControl('', []),
      valor: new FormControl('', [Validators.required]),
      tipo: new FormControl('', [Validators.required])
    });
    this.subs[0] = this.store.select('app').subscribe(x => this.cartera = x.cartera);
  }

  ngOnDestroy(): void {
    this.subs.forEach(sub => sub.unsubscribe());
  }

  ngOnInit(): void {
  }

  enviar(): void {
    if (this.form.invalid) {
      this.shared.enviarAlerta('warning', 'Error', 'Verifique los datos ingresados');
      return;
    }

    const concepto: string = this.form.value.concepto;
    const descripcion: string = this.form.value.descripcion;
    const valor: number = this.form.value.valor;
    const tipo: string = this.form.value.tipo;

    this.store.dispatch(putConcepto({
      cartera: this.cartera,
      nombre: concepto,
      descripcion,
      valor,
      tipo
    }));

    this.form.reset();
  }

}
