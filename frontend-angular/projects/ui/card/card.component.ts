import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';

export interface MazuCardInput {
  isSelected?: boolean;
}

@Component({
  selector: 'mz-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class MazuCardComponent {
  @Input() isSelected?: MazuCardInput['isSelected'] = false;
}
