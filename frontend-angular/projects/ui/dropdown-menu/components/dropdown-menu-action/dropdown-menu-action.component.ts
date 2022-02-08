import { Component, HostListener, Input, ViewEncapsulation } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';

import { MazuDropdownMenuService } from '../../services';

@Component({
  selector: 'mz-dropdown-menu-action',
  templateUrl: './dropdown-menu-action.component.html',
  styleUrls: ['./dropdown-menu-action.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class MazuDropdownMenuActionComponent {
  @Input() name!: string;

  isSelected = false;

  private destroy$ = new Subject<void>();

  constructor(
    private dropdownMenuService: MazuDropdownMenuService,
  ) {}

  ngOnInit(): void {
    this.dropdownMenuService.getSelectedAction()
      .pipe(takeUntil(this.destroy$))
      .subscribe(action => this.isSelected = action === this.name);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  @HostListener('click')
  onClick(): void {
    this.dropdownMenuService.setSelectedAction(this.name);
  }
}
