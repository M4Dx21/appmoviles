import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LectorqrPage } from './lectorqr.page';

const routes: Routes = [
  {
    path: '',
    component: LectorqrPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LectorqrPageRoutingModule {}
