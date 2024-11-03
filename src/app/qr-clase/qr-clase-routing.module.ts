import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QrClasePage } from './qr-clase.page';

const routes: Routes = [
  {
    path: '',
    component: QrClasePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QrClasePageRoutingModule {}
