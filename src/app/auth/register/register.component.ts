import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SharedService } from '../../services/shared.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.store';
import { registrar } from '../../store/actions/auth.actions';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass']
})
export class RegisterComponent implements OnInit {

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private shared: SharedService,
    private store: Store<AppState>
  ) {
    this.form = this.fb.group({
      nombre: new FormControl('', [Validators.required]),
      correo: new FormControl('', [Validators.required, Validators.email]),
      contrasena: new FormControl('', [Validators.required, Validators.minLength(6)]),
    });
  }

  ngOnInit(): void {
  }

  enviar(): void {
    if (this.form.invalid) {
      this.shared.enviarAlerta('warning', 'Error', 'Verifique los campos');
      return;
    }

    this.store.dispatch(registrar({
      email: this.form.value.correo,
      password: this.form.value.contrasena,
      nombre: this.form.value.nombre
    }));
  }
}
