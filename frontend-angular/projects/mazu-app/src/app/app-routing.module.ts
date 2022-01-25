import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { environment } from 'projects/mazu-app/src/environments/environment';

let routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'auth/signin',
  },
  {
    path: 'auth',
    loadChildren: () => import('./features/auth/auth.module').then(m => m.AuthModule),
  },
];

if (environment.withLab) {
  routes = [
    ...routes,
    {
      path: 'lab',
      loadChildren: () => import('./features/lab/lab.module').then(m => m.LabModule),
    },
  ];
}

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
