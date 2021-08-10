import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { SharedService } from '../../../services/shared.service';
import { postSobre } from '../../../store/actions/app.actions';
import { AppState } from '../../../store/app.store';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-agregar-sobre',
  templateUrl: './agregar-sobre.component.html',
  styleUrls: ['./agregar-sobre.component.sass']
})
export class AgregarSobreComponent implements OnInit {
  form: FormGroup;

  constructor(
    private shared: SharedService,
    private fb: FormBuilder,
    private store: Store<AppState>
  ) {
    this.form = this.fb.group({
      concepto: new FormControl('', [Validators.required]),
      cantidad: new FormControl(null, [Validators.required]),
    });
  }

  ngOnInit(): void {
  }

  enviar(): void {
    if (this.form.invalid) {
      this.shared.enviarAlerta('error', 'Error', 'Debe completar todos los campos');
      return;
    }

    this.store.dispatch(postSobre({ cantidad: this.form.value.cantidad, concepto: this.form.value.concepto }));

    this.form.setValue({
      concepto: '',
      cantidad: null,
    });
  }
}
