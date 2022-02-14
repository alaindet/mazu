import { Component } from '@angular/core';

@Component({
  templateUrl: './dropdown-menu.component.html',
  styleUrls: ['./dropdown-menu.component.scss'],
})
export class DemoDropdownMenuComponent {
  consoleLog = console.log;
  actionSelected: string | null = null;

  onActionClicked(action: string): void {
    console.log('actionClicked', action);
    this.actionSelected = action;
  }
}
