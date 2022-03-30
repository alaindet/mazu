import { ChangeDetectionStrategy, Component, HostListener, Input, ViewEncapsulation } from '@angular/core';

import { MazuAutocompleteService } from '../autocomplete.service';

@Component({
  selector: 'mz-autocomplete-item',
  templateUrl: './autocomplete-item.component.html',
  styleUrls: ['./autocomplete-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'mz-autocomplete-item',
  },
  exportAs: 'mzAutocompleteItem',
})
export class MazuAutocompleteItemComponent {
  @Input() value!: any;

  constructor(
    private autocompleteSvc: MazuAutocompleteService,
  ) {}

  @HostListener('click')
  onClick(): void {
    this.autocompleteSvc.selectOption(this.value);
  }
}
