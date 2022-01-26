import { DemoButtonComponent } from './components/button/button.component';
import { DemoCardComponent } from './components/card/card.component';
import { DemoCheckboxComponent } from './components/checkbox/checkbox.component';
import { DemoFloatingComponent } from './components/floating/floating.component';

export const LAB_COMPONENTS_ROUTES = [
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
    path: 'floating',
    component: DemoFloatingComponent,
    data: { label: 'Floating' },
  },
];
