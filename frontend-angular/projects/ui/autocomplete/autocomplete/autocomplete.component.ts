import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs';

import { FormOption } from '@/common';
import { MazuInputComponent } from '@/ui/input';
import { MazuAutocompleteService } from '../autocomplete.service';

@Component({
  selector: 'mz-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'mz-autocomplete',
  },
  exportAs: 'mzAutocomplete',
  providers: [MazuAutocompleteService],
})
export class MazuAutocompleteComponent {

  @Input() ref!: MazuInputComponent;
  @Input() options: FormOption[] = [];

  // Public API
  options$!: Observable<FormOption[]>;

  constructor(
    private autocompleteSvc: MazuAutocompleteService,
  ) {
    this.options$ = this.autocompleteSvc.options$;
  }
}
