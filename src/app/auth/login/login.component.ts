import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { SharedService } from '../../services/shared.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.store';
import { login } from '../../store/actions/auth.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private shared: SharedService,
    private store: Store<AppState>
  ) {
    this.form = this.fb.group({
      correo: new FormControl(localStorage.getItem('correo') , [Validators.required, Validators.email]),
      contrasena: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
  }

  enviar(): void {
    if (this.form.invalid) {
      this.shared.enviarAlerta('error', 'Error', 'Verifique los campos');
      return;
    }

    this.store.dispatch(login({ email: this.form.value.correo, password: this.form.value.contrasena }));
  }

}
