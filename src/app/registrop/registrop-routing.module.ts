import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegistropPage } from './registrop.page';

const routes: Routes = [
  {
    path: '',
    component: RegistropPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistropPageRoutingModule {}
