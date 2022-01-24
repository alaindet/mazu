import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'store',
  },
  {
    path: 'store',
    loadChildren: () => import('./store/store.module')
      .then(m => m.LabStoreModule),
  },
  {
    path: 'components',
    loadChildren: () => import('./components/components.module')
      .then(m => m.LabComponentsFeatureModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LabModule {}
