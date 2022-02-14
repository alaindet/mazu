import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { MazuButtonComponentModule } from '@/ui/button';
import { MazuCardComponentModule } from '@/ui/card';
import { MazuCheckboxComponentModule } from '@/ui/checkbox';
import { MazuDropdownMenuComponentModule } from '@/ui/dropdown-menu';
import { MazuFloatingModule } from '@/common/floating';
import { MazuFormFieldModule } from '@/ui/form-field';

import { DemoComponentsIndexComponent } from './index/index.component';
import { DemoComponentsFeatureComponent } from './components.component';
import { DemoButtonComponent } from './components/button/button.component';
import { DemoCardComponent } from './components/card/card.component';
import { DemoCheckboxComponent } from './components/checkbox/checkbox.component';
import { DemoDropdownMenuComponent } from './components/dropdown-menu/dropdown-menu.component';
import { DemoFloatingComponent } from './components/floating/floating.component';
import { DemoFormFieldComponent } from './components/form-field/form-field.component';
import { DEMO_COMPONENTS_ROUTES } from './routes';

const routes: Routes = [
	{
		path: '',
		component: DemoComponentsFeatureComponent,
		children: [
			{
        path: '',
        component: DemoComponentsIndexComponent
      },
			...DEMO_COMPONENTS_ROUTES,
		]
	}
];

@NgModule({
	imports: [
		CommonModule,
    RouterModule.forChild(routes),
    MazuButtonComponentModule,
    MazuCardComponentModule,
    MazuCheckboxComponentModule,
    MazuDropdownMenuComponentModule,
    MazuFloatingModule,
		MazuFormFieldModule,
	],
	declarations: [
		DemoComponentsFeatureComponent,
		DemoComponentsIndexComponent,
    DemoButtonComponent,
    DemoCardComponent,
    DemoCheckboxComponent,
    DemoDropdownMenuComponent,
    DemoFloatingComponent,
		DemoFormFieldComponent,
	],
})
export class ComponentsModule {}
