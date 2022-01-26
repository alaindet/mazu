import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, forwardRef, HostBinding, Input, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

import { MazuCheckboxInput } from './checkbox.input';
import { MazuCheckboxEvent } from './checkbox.output';

const FormControlAccessorToken = {
	provide: NG_VALUE_ACCESSOR,
	useExisting: forwardRef(() => MazuCheckboxComponent),
	multi: true,
};

@Component({
  selector: 'mz-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  providers: [FormControlAccessorToken],
})
export class MazuCheckboxComponent {

  @Input() value: MazuCheckboxInput['value'];
	@Input() isChecked: MazuCheckboxInput['isChecked'] = false;
  @Input() size: MazuCheckboxInput['size'] = 'medium';

	@Output() changed = new EventEmitter<MazuCheckboxEvent>();

  @ViewChild('inputRef', { static: true })
	inputRef!: ElementRef<HTMLInputElement>;

  @HostBinding('style.--custom-size')
  customSize = '16px';

  iconCssClass!: string;

	private onChange!: (val: any) => {};
	private onTouched!: () => {};

  ngOnInit(): void {
    this.setSizeStyle();
  }

  private setSizeStyle(): void {
    if (this.size === 'medium' || this.size === 'large') {
      this.iconCssClass = `--size-${this.size}`;
      return;
    }

    this.iconCssClass = '--size-custom';
    this.customSize = this.size;
  }

	onInputChange(inputEvent: any): void {
		this.isChecked = this.inputRef.nativeElement.checked;
		this.changed.emit({
			isChecked: this.isChecked,
			value: this.value,
		});

		if (this.onChange) {
			this.onChange(this.isChecked);
      this.onTouched();
		}
	}

	// From ControlValueAccessor
	writeValue(value: boolean | null): void {
		const isChecked = !!value;
		this.inputRef.nativeElement.checked = isChecked;
		this.isChecked = isChecked;
	}

	// From ControlValueAccessor
	registerOnChange(fn: (val: any) => {}): void {
		this.onChange = fn;
	}

	// From ControlValueAccessor
	registerOnTouched(fn: () => {}): void {
		this.onTouched = fn;
	}
}
