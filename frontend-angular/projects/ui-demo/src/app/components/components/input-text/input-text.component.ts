import { Component } from '@angular/core';

@Component({
  templateUrl: './input-text.component.html',
})
export class DemoInputTextComponent {
  consoleLog = console.log;
  debouncedValue = 'Edit this!';

  onDebouncedValue(value: string): void {
    this.debouncedValue = value;
  }
}
