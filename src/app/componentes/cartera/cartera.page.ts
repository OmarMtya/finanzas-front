import { Component, OnInit, OnDestroy } from '@angular/core';
import { ViewDidEnter, ViewDidLeave } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Cartera } from '../../models/cartera.model';
import { AppState } from '../../store/app.store';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-cartera',
  templateUrl: './cartera.page.html',
  styleUrls: ['./cartera.page.scss'],
})
export class CarteraPage implements OnInit, OnDestroy {

  ngOnDestroy(): void {

  }

  ngOnInit(): void {

  }



}
