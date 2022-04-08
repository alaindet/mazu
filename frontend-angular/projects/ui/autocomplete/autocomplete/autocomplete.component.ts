import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation, SimpleChanges, OnInit, OnChanges, OnDestroy, Output, EventEmitter } from '@angular/core';
import { BehaviorSubject, fromEvent, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

import { createDebouncedInputEvent, didInputChange, FormOption, MazuInputApi, KeyboardKey } from '@/common';
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

  @Output() selected = new EventEmitter<any>();

  private subs: { [sub: string]: Subscription } = {};
  private _options$ = new BehaviorSubject<FormOption[]>([]);
  options$ = this._options$.asObservable(); // TODO: Optimization of first [] event

  constructor(
    private autocompleteSvc: MazuAutocompleteService,
  ) {}

  ngOnChanges(changes: SimpleChanges) {
    if (didInputChange(changes['options'])) {
      this.autocompleteSvc.setOptions(this.options);
      this.subs['options']?.unsubscribe();
      this.subs['options'] = this.autocompleteSvc.options$
        .subscribe(options => this._options$.next(options));
    }
  }

  ngOnInit() {
    this.initInputRef();
    this.initSelectedOption();
  }

  ngOnDestroy() {
    Object.values(this.subs).forEach(sub => sub.unsubscribe());
  }

  private initInputRef(): void {
    const el = this.ref.getNativeElement();

    this.subs['input'] = createDebouncedInputEvent(el, this.updateInterval)
      .subscribe(val => this.autocompleteSvc.setFilter(val));

    const CONTROL_KEYS = {
      [KeyboardKey.ArrowUp]: KeyboardKey.ArrowUp,
      [KeyboardKey.ArrowDown]: KeyboardKey.ArrowDown,
      [KeyboardKey.Enter]: KeyboardKey.Enter,
    };

    // TODO
    this.subs['keydown'] = fromEvent<KeyboardEvent>(el, 'keydown')
      .pipe(filter(e => e.key in CONTROL_KEYS))
      .subscribe(e => {
        e.preventDefault()
        switch (e.key) {
          case KeyboardKey.ArrowUp:
            console.log('up');
            break;
          case KeyboardKey.ArrowDown:
            console.log('down');
            break;
          case KeyboardKey.Enter:
            console.log('confirm');
            break;
        }
      });
  }

  private initSelectedOption(): void {
    this.subs['selectedOption'] = this.autocompleteSvc.selectedOption$
      .subscribe(option => this.selected.emit(option));
  }
}
