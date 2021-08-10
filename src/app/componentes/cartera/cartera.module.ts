import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CarteraPageRoutingModule } from './cartera-routing.module';

import { CarteraPage } from './cartera.page';
import { ListaConceptosComponent } from './lista-conceptos/lista-conceptos.component';
import { AgregarConceptoComponent } from './agregar-concepto/agregar-concepto.component';
import { IngresoMensualComponent } from './ingreso-mensual/ingreso-mensual.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CarteraPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [
    CarteraPage,
    ListaConceptosComponent,
    AgregarConceptoComponent,
    IngresoMensualComponent
  ],
  exports: [
    CarteraPage
  ]
})
export class CarteraPageModule {}
