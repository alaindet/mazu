import { Component } from '@angular/core';

@Component({
  templateUrl: './autocomplete.component.html',
})
export class DemoAutocompleteComponent {
  consoleLog = console.log;
  options: any[] = [
    { value: 'foo', label: 'Foo' },
    { value: 'bar', label: 'Bar' },
    { value: 'baz', label: 'Baz' },
  ];
}
