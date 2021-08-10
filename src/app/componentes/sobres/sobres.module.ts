import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SobresRoutingModule } from './sobres-routing.module';
import { SobresComponent } from './sobres.component';
import { AgregarSobreComponent } from './agregar-sobre/agregar-sobre.component';
import { ListadoSobresComponent } from './listado-sobres/listado-sobres.component';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CartaSobreComponent } from './carta-sobre/carta-sobre.component';


@NgModule({
  declarations: [
    SobresComponent,
    AgregarSobreComponent,
    ListadoSobresComponent,
    CartaSobreComponent
  ],
  imports: [
    IonicModule.forRoot(),
    CommonModule,
    SobresRoutingModule,
    ReactiveFormsModule
  ],
  exports: [
    SobresComponent
  ]
})
export class SobresModule { }
