import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SchulauswahlPage } from './schulauswahl.page';

const routes: Routes = [
  {
    path: '',
    component: SchulauswahlPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
  ],
  declarations: [SchulauswahlPage]
})
export class SchulauswahlPageModule {}