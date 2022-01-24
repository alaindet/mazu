import { ChangeDetectionStrategy, Component, HostBinding, Input, ViewEncapsulation } from '@angular/core';

export interface MazuButtonInput {
  color: 'primary' | 'primary-outline' | 'secondary';
  size: 'small' | 'medium' | 'large';
  withFullWidth?: boolean;
  withIcon?: 'left' | 'right';
  isDisabled?: boolean;
}

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
  @Input() withFullWidth?: MazuButtonInput['withFullWidth'] = false;
  @Input() withIcon?: MazuButtonInput['withIcon'];

  @Input()
  @HostBinding('class.--disabled')
  isDisabled: MazuButtonInput['isDisabled'] = false;

  @HostBinding('class')
  cssClasses!: string;

  ngOnInit(): void {
    const cssClasses = [
      'mz-button',
      `--color-${this.color}`,
      `--size-${this.size}`,
      this.withFullWidth ? '--full-width' : null,
      this.withIcon ? `--with-icon-${this.withIcon}` : null,
		];

    this.cssClasses = cssClasses.filter(cssClass => cssClass !== null).join(' ');
	}
}
