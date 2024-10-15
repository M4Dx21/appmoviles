import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GeneradorqrPageRoutingModule } from './generadorqr-routing.module';

import { GeneradorqrPage } from './generadorqr.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GeneradorqrPageRoutingModule
  ],
  declarations: [GeneradorqrPage]
})
export class GeneradorqrPageModule {}
