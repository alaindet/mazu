import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, HostBinding, Input, OnDestroy, OnInit, Output, ViewEncapsulation } from '@angular/core';

import { InputBoolean, createDebouncedInputEvent, MazuInputApi } from '@/common';
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
  exportAs: 'mzInput',
})
export class MazuInputComponent implements OnInit, OnDestroy, MazuInputApi {

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

  // Public API
  focus(): void {
    this.host.nativeElement.focus();
  }

  // Public API
  clear(): void {
    this.host.nativeElement.value = '';
  }

  // Public API
  clearAndFocus(): void {
    this.host.nativeElement.value = '';
    this.host.nativeElement.focus();
  }

  // Public API
  getValue(): string {
    return this.host.nativeElement.value;
  }

  // Public API
  getNativeElement(): HTMLInputElement {
    return this.host.nativeElement;
  }

  // Public API
  setValue(newValue: string): void {
    this.host.nativeElement.value = newValue;
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
    this.debounceSub = createDebouncedInputEvent(this.host.nativeElement, delay)
      .subscribe((inputValue: any) => this.debouncedValue.emit(inputValue));
  }
}
