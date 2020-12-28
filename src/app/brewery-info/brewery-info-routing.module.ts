import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BreweryInfoPage } from './brewery-info.page';

const routes: Routes = [
  {
    path: '',
    component: BreweryInfoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BreweryInfoPageRoutingModule {}
