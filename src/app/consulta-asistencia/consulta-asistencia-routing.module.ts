import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConsultaAsistenciaPage } from './consulta-asistencia.page';

const routes: Routes = [
  {
    path: '',
    component: ConsultaAsistenciaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConsultaAsistenciaPageRoutingModule {}
