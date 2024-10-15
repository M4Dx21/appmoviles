import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GeneradorqrPage } from './generadorqr.page';

const routes: Routes = [
  {
    path: '',
    component: GeneradorqrPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GeneradorqrPageRoutingModule {}
