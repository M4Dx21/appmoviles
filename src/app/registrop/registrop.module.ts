import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistropPageRoutingModule } from './registrop-routing.module';

import { RegistropPage } from './registrop.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegistropPageRoutingModule
  ],
  declarations: [RegistropPage]
})
export class RegistropPageModule {}
