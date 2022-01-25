import { DemoButtonComponent } from './components/button/button.component';
import { DemoCardComponent } from './components/card/card.component';

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
];
