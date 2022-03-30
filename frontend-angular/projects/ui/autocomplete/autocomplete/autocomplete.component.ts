import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation, SimpleChanges, OnInit, OnChanges, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';

import { createDebouncedInputEvent, didInputChange, FormOption, MazuInputApi } from '@/common';
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
export class MazuAutocompleteComponent implements OnInit, OnChanges, OnDestroy {

  @Input() ref!: MazuInputApi;
  @Input() updateInterval = 400;
  @Input() options: FormOption[] = [];

  private _options$ = new BehaviorSubject<FormOption[]>([]);
  options$ = this._options$.asObservable(); // TODO: Optimization of first [] event

  // TODO: Group
  private inputSub?: Subscription;
  private optionsSub?: Subscription;

  constructor(
    private autocompleteSvc: MazuAutocompleteService,
  ) {}

  ngOnChanges(changes: SimpleChanges) {
    if (didInputChange(changes['options'])) {
      this.autocompleteSvc.setOptions(this.options);
      this.optionsSub?.unsubscribe();
      this.optionsSub = this.autocompleteSvc.options$
        .subscribe(options => this._options$.next(options));
    }
  }

  ngOnInit() {
    this.initInputRef();
  }

  ngOnDestroy() {
    this.inputSub?.unsubscribe();
    this.optionsSub?.unsubscribe();
  }

  private initInputRef(): void {
    const el = this.ref.getNativeElement();
    this.inputSub = createDebouncedInputEvent(el, this.updateInterval)
      .subscribe(val => this.autocompleteSvc.setFilter(val));
  }
}
