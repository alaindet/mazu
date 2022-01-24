import { LabComponentsButtonComponent } from './components/button/button.component';
import { LabComponentsCardComponent } from './components/card/card.component';

export const LAB_COMPONENTS_ROUTES = [
  {
    path: 'button',
    component: LabComponentsButtonComponent,
    data: { label: 'Button' },
  },
  {
    path: 'card',
    component: LabComponentsCardComponent,
    data: { label: 'Card' },
  },
];
