import { Component } from '@angular/core';

import { MazuFloatingService } from '../services/floating.service';

@Component({
  selector: 'mz-floating-host',
  template: `
    <ng-container *ngFor="let template of floatingService.templates$ | async">
      <ng-container [ngTemplateOutlet]="template"></ng-container>
    </ng-container>
  `,
})
export class MazuFloatingHostComponent {
  constructor(
    public floatingService: MazuFloatingService,
  ) {}
}
