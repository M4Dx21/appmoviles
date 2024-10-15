import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomepPage } from './homep.page';

const routes: Routes = [
  {
    path: '',
    component: HomepPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomepPageRoutingModule {}
