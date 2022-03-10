import { ChangeDetectionStrategy, Component, HostBinding, Input, ViewEncapsulation } from '@angular/core';

import { InputBoolean } from '@/common';
import { MazuInputInput } from './input.input';

@Component({
  selector: 'input[mzInput]',
  template: '<ng-content></ng-content>',
  styleUrls: ['./input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class MazuInputComponent {

  @Input() size: MazuInputInput['size'] = 'medium';

  @Input()
  @InputBoolean()
  isDisabled?: MazuInputInput['withFullWidth'] = false;

  @Input()
  @InputBoolean()
  withFullWidth?: MazuInputInput['isDisabled'] = false;

  @HostBinding('class')
  cssClasses!: string;

  ngOnInit(): void {
    const cssClasses = [
      'mz-input',
      `--size-${this.size}`,
      this.withFullWidth ? '--full-width' : null,
      this.isDisabled ? '--disabled' : null,
		];

    this.cssClasses = cssClasses.filter(cssClass => cssClass !== null).join(' ');
	}
}
