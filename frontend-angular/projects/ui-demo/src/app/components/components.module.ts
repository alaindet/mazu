import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { MazuFloatingModule } from '@/common/floating';
import { MazuAutocompleteModule } from '@/ui/autocomplete';
import { MazuButtonComponentModule } from '@/ui/button';
import { MazuCardComponentModule } from '@/ui/card';
import { MazuCheckboxComponentModule } from '@/ui/checkbox';
import { MazuDropdownMenuComponentModule } from '@/ui/dropdown-menu';
import { MazuFormFieldModule } from '@/ui/form-field';
import { MazuInputModule } from '@/ui/input';

import { DemoComponentsIndexComponent } from './index/index.component';
import { DemoComponentsFeatureComponent } from './components.component';
import { DemoAutocompleteComponent } from './components/autocomplete/autocomplete.component';
import { DemoButtonComponent } from './components/button/button.component';
import { DemoCardComponent } from './components/card/card.component';
import { DemoCheckboxComponent } from './components/checkbox/checkbox.component';
import { DemoDropdownMenuComponent } from './components/dropdown-menu/dropdown-menu.component';
import { DemoFloatingComponent } from './components/floating/floating.component';
import { DemoFormFieldComponent } from './components/form-field/form-field.component';
import { DemoInputTextComponent } from './components/input-text/input-text.component';
import { DemoInputGroupComponent } from './components/input-group/input-group.component';
import { DEMO_COMPONENTS_ROUTES } from './routes';

const routes: Routes = [
	{
		path: '',
		component: DemoComponentsFeatureComponent,
		children: [
			{
        path: '',
        component: DemoComponentsIndexComponent,
      },
			...DEMO_COMPONENTS_ROUTES,
		]
	}
];

@NgModule({
	imports: [
		CommonModule,
    RouterModule.forChild(routes),
    FontAwesomeModule,

    MazuAutocompleteModule,
		MazuFormFieldModule,
    MazuButtonComponentModule,
    MazuCardComponentModule,
    MazuCheckboxComponentModule,
    MazuDropdownMenuComponentModule,
    MazuFloatingModule,
    MazuInputModule,
	],
	declarations: [
		DemoComponentsFeatureComponent,
		DemoComponentsIndexComponent,
		DemoFormFieldComponent,
    DemoAutocompleteComponent,
    DemoButtonComponent,
    DemoCardComponent,
    DemoCheckboxComponent,
    DemoDropdownMenuComponent,
    DemoFloatingComponent,
    DemoInputGroupComponent,
    DemoInputTextComponent,
	],
})
export class ComponentsModule {}
