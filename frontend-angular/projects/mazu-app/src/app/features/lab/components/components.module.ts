import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { MazuButtonComponentModule } from '@/shared/components/button';
import { MazuCardComponentModule } from '@/shared/components/card';

import { LabComponentsIndexComponent } from './index/index.component';
import { LabComponentsFeatureComponent } from './components.component';
import { LabComponentsButtonComponent } from './components/button/button.component';
import { LabComponentsCardComponent } from './components/card/card.component';
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
    RouterModule.forChild(routes),
    MazuButtonComponentModule,
    MazuCardComponentModule,
	],
	declarations: [
		LabComponentsFeatureComponent,
		LabComponentsIndexComponent,
    LabComponentsButtonComponent,
    LabComponentsCardComponent,
	],
})
export class LabComponentsFeatureModule {}
