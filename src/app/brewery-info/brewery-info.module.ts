import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BreweryInfoPageRoutingModule } from './brewery-info-routing.module';

import { BreweryInfoPage } from './brewery-info.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BreweryInfoPageRoutingModule
  ],
  declarations: [BreweryInfoPage]
})
export class BreweryInfoPageModule {}
