import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LectorqrPageRoutingModule } from './lectorqr-routing.module';

import { LectorqrPage } from './lectorqr.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LectorqrPageRoutingModule
  ],
  declarations: [LectorqrPage]
})
export class LectorqrPageModule {}
