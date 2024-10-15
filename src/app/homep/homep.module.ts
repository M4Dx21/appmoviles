import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HomepPageRoutingModule } from './homep-routing.module';
import { HomepPage } from './homep.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomepPageRoutingModule
  ],
  declarations: [HomepPage]
})
export class HomepPageModule {}
