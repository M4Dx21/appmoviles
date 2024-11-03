import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QRCodeModule } from 'angularx-qrcode';

import { QrClasePageRoutingModule } from './qr-clase-routing.module';

import { QrClasePage } from './qr-clase.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QrClasePageRoutingModule,
    QRCodeModule
  ],
  declarations: [QrClasePage]
})
export class QrClasePageModule {}
