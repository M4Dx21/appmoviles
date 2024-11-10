import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConsultaAsistenciaPageRoutingModule } from './consulta-asistencia-routing.module';

import { ConsultaAsistenciaPage } from './consulta-asistencia.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConsultaAsistenciaPageRoutingModule
  ],
  declarations: [ConsultaAsistenciaPage]
})
export class ConsultaAsistenciaPageModule {}
