import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

export interface MazuCheckboxInput {
  // ...
}

@Component({
  selector: 'mz-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class MazuCheckboxComponent {
  // ...
}
