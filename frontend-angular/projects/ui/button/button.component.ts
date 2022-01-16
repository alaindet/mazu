import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: '[mzButton]',
  template: '<ng-content></ng-content>',
  styleUrls: ['./button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MazuButtonComponent {
  @Input() color = 'primary';
  @Input() size = 'medium';
}
