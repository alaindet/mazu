import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { SignInFeatureComponent } from './sign-in.component';

const routes: Routes = [
  {
    path: '',
    component: SignInFeatureComponent,
  },
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
  declarations: [
    SignInFeatureComponent,
  ],
  exports: [RouterModule],
})
export class SignInModule {}
