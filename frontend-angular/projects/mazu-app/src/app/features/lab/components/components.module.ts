import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes } from '@angular/router';

import { MazuButtonComponentModule } from '@/shared/components/button';

import { LabComponentsIndexComponent } from './index/index.component';
import { LabComponentsFeatureComponent } from './components.component';
import { LAB_COMPONENTS_ROUTES } from './routes';

const routes: Routes = [
	{
		path: '',
		component: LabComponentsFeatureComponent,
		children: [
			{
        path: '',
        component: LabComponentsIndexComponent
      },
			...LAB_COMPONENTS_ROUTES,
		]
	}
];

@NgModule({
	imports: [
		CommonModule,
    MazuButtonComponentModule,
	],
	declarations: [
		LabComponentsFeatureComponent,
		LabComponentsIndexComponent,
	],
})
export class LabComponentsFeatureModule {}
