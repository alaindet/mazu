import { Component } from '@angular/core';
import { faMagnifyingGlass, faSliders } from '@fortawesome/free-solid-svg-icons';

@Component({
  templateUrl: './input-group.component.html',
})
export class DemoInputGroupComponent {
  consoleLog = console.log;
  faMagnifyingGlass = faMagnifyingGlass;
  faSliders = faSliders;
}
