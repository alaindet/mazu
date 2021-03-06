import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'mz-dropdown-menu-trigger',
  templateUrl: './dropdown-menu-trigger.component.html',
  styleUrls: ['./dropdown-menu-trigger.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class MazuDropdownMenuTriggerComponent {
  @Input() name!: string;
  @Input() triggerOn: 'click' | 'hover' = 'click';
}
