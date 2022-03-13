import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, HostBinding, Input, OnDestroy, OnInit, Output, ViewEncapsulation } from '@angular/core';

import { InputBoolean, createDebouncedInputEvent } from '@/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'input[mzInput]',
  template: '<ng-content></ng-content>',
  styleUrls: ['./input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'mz-input',
  },
})
export class MazuInputComponent implements OnInit, OnDestroy {

  @Input() size: 'small' | 'medium' | 'large' = 'medium';
  @Input() @InputBoolean() isDisabled?: boolean | string = false;
  @Input() @InputBoolean() withFullWidth?: boolean | string = false;
  @Input() @InputBoolean() withError?: boolean | string = false;
  @Input() @InputBoolean() withSuccess?: boolean | string = false;
  @Input() withDebounce?: number | boolean | string = false;

  @Output() debouncedValue = new EventEmitter<string>();

  @HostBinding('class')
  cssClasses!: string;

  private debounceSub?: Subscription;

  constructor(
    private host: ElementRef<HTMLInputElement>,
  ) {}

  ngOnInit() {
    this.initStyle();
    this.initDebounceInputEvent();
	}

  ngOnDestroy() {
    this.debounceSub?.unsubscribe();
  }

  private initStyle(): void {
    const cssClasses = [
      `--size-${this.size}`,
      this.withError ? '--error' : null,
      this.withSuccess ? '--success' : null,
      this.withFullWidth ? '--full-width' : null,
      this.isDisabled ? '--disabled' : null,
		];

    this.cssClasses = cssClasses.filter(cssClass => cssClass !== null).join(' ');
  }

  private initDebounceInputEvent(): void {
    if (this.withDebounce === false) {
      return;
    }

    const delay = this.withDebounce ? +this.withDebounce : 400;
    this.debounceSub = createDebouncedInputEvent(this.host, delay)
      .subscribe(inputValue => this.debouncedValue.emit(inputValue));
  }
}
