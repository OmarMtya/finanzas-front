import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SobresComponent } from './sobres.component';
import { ListadoSobresComponent } from './listado-sobres/listado-sobres.component';
import { AgregarSobreComponent } from './agregar-sobre/agregar-sobre.component';

const routes: Routes = [
  {
    path: '',
    component: SobresComponent,
    children: [
      {
        path: 'lista',
        component: ListadoSobresComponent
      },
      {
        path: 'agregar',
        component: AgregarSobreComponent
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'lista',
      },
      {
        path: '**',
        redirectTo: 'lista',
      }
    ]
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'lista',
  },
  {
    path: '**',
    redirectTo: 'lista',
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SobresRoutingModule { }
