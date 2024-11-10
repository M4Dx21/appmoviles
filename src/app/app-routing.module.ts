import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { NotFoundPage } from './not-found/not-found.page';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'homep',
    loadChildren: () => import('./homep/homep.module').then(m => m.HomepPageModule)
  },
  {
    path: 'consulta-asistencia',
    loadChildren: () => import('./consulta-asistencia/consulta-asistencia.module').then( m => m.ConsultaAsistenciaPageModule)
  },
  {
    path: 'qr-clase',
    loadChildren: () => import('./qr-clase/qr-clase.module').then( m => m.QrClasePageModule)
  },
  {
    path: 'lectorqr',
    loadChildren: () => import('./lectorqr/lectorqr.module').then( m => m.LectorqrPageModule)
  },
  {
    path: 'generadorqr',
    loadChildren: () => import('./generadorqr/generadorqr.module').then( m => m.GeneradorqrPageModule)
  },
  {
    path: 'registro',
    loadChildren: () => import('./registro/registro.module').then( m => m.RegistroPageModule)
  },
  {
    path: 'registrop',
    loadChildren: () => import('./registrop/registrop.module').then( m => m.RegistropPageModule)
  },
  {
    path: 'not-found',
    loadChildren: () => import('./not-found/not-found.module').then( m => m.NotFoundPageModule)
  },
  {
    path: '**',
    redirectTo: 'not-found' 
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
