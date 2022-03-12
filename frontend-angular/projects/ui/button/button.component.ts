import { ChangeDetectionStrategy, Component, HostBinding, Input, ViewEncapsulation } from '@angular/core';

import { InputBoolean } from '@/common';
import { MazuButtonInput } from './button.input';

@Component({
  selector: '[mzButton]',
  template: '<ng-content></ng-content>',
  styleUrls: ['./button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class MazuButtonComponent {

  @Input() color: MazuButtonInput['color'] = 'primary';
  @Input() size: MazuButtonInput['size'] = 'medium';
  @Input() withIcon?: MazuButtonInput['withIcon'];

  @Input()
  @InputBoolean()
  isDisabled?: MazuButtonInput['withFullWidth'] = false;

  @Input()
  @InputBoolean()
  withFullWidth?: MazuButtonInput['isDisabled'] = false;

  @HostBinding('class')
  cssClasses!: string;

  ngOnInit() {
    const cssClasses = [
      'mz-button',
      `--color-${this.color}`,
      `--size-${this.size}`,
      this.withFullWidth ? '--full-width' : null,
      this.withIcon ? `--with-icon-${this.withIcon}` : null,
      this.isDisabled ? '--disabled' : null,
		];

    this.cssClasses = cssClasses.filter(cssClass => cssClass !== null).join(' ');
	}
}
