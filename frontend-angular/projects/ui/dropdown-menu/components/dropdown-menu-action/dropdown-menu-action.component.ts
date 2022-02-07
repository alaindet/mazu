import { ChangeDetectionStrategy, Component, HostBinding, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'mz-dropdown-menu-action',
  template: '<ng-content></ng-content>',
  styleUrls: ['./dropdown-menu-action.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class MazuDropdownMenuActionComponent {
  @Input() name!: string;

  @Input()
  @HostBinding('class.--selected')
  isSelected = false;
}
