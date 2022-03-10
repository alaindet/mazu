import { Component, HostListener, Input, ViewEncapsulation } from '@angular/core';

import { MazuDropdownMenuService } from '../../services';

@Component({
  selector: 'mz-dropdown-menu-action',
  templateUrl: './dropdown-menu-action.component.html',
  styleUrls: ['./dropdown-menu-action.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class MazuDropdownMenuActionComponent {
  @Input() name!: string;

  constructor(
    private dropdownMenuService: MazuDropdownMenuService,
  ) {}

  @HostListener('click')
  onClick(): void {
    this.dropdownMenuService.setSelectedAction(this.name);
  }
}
