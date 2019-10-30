import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { BalancetePage } from './balancete.page';
import { BalanceteFilterPipe } from './balancete-filter.pipe';

import { MatTableModule } from '@angular/material/table';

const routes: Routes = [
  {
    path: '',
    component: BalancetePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    MatTableModule
  ],
  declarations: [
    BalancetePage,
    BalanceteFilterPipe
  ]
})
export class BalancetePageModule {}
