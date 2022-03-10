import { DemoButtonComponent } from './components/button/button.component';
import { DemoCardComponent } from './components/card/card.component';
import { DemoCheckboxComponent } from './components/checkbox/checkbox.component';
import { DemoDropdownMenuComponent } from './components/dropdown-menu/dropdown-menu.component';
import { DemoFloatingComponent } from './components/floating/floating.component';
import { DemoFormFieldComponent } from './components/form-field/form-field.component';

export const DEMO_COMPONENTS_ROUTES = [
  {
    path: 'button',
    component: DemoButtonComponent,
    data: { label: 'Button' },
  },
  {
    path: 'card',
    component: DemoCardComponent,
    data: { label: 'Card' },
  },
  {
    path: 'checkbox',
    component: DemoCheckboxComponent,
    data: { label: 'Checkbox' },
  },
  {
    path: 'dropdown-menu',
    component: DemoDropdownMenuComponent,
    data: { label: 'Dropdown Menu' },
  },
  {
    path: 'floating',
    component: DemoFloatingComponent,
    data: { label: 'Floating' },
  },
  {
    path: 'form-field',
    component: DemoFormFieldComponent,
    data: { label: 'Form Field' },
  },
];
