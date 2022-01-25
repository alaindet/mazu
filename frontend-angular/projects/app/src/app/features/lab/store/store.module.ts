import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { LabStoreFeatureComponent } from './store.component';

const routes: Routes = [
  {
    path: '',
    component: LabStoreFeatureComponent,
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
  declarations: [
    LabStoreFeatureComponent,
  ],
  exports: [
    RouterModule,
  ],
})
export class LabStoreModule {}
