import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { NoUserGuard } from './guards/no-user.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule),
    canActivate: [
      AuthGuard
    ]
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
    canActivate: [NoUserGuard]
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/auth/login',
  },
  { path: 'cartera', loadChildren: () => import('./componentes/cartera/cartera.module').then(m => m.CarteraPageModule) },
  {
    path: '**',
    redirectTo: '/',
  },
  {
    path: 'cartera',
    loadChildren: () => import('./componentes/cartera/cartera.module').then( m => m.CarteraPageModule)
  },  {
    path: 'resumen',
    loadChildren: () => import('./componentes/resumen/resumen.module').then( m => m.ResumenPageModule)
  }


];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
