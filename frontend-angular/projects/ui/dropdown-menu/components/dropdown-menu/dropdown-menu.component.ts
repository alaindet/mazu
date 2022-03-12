import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { filter, Subject, takeUntil } from 'rxjs';

import { didInputChange } from '@/common';
import { MazuFloatingTargetPlacement } from '@/common/floating';
import { MazuDropdownMenuService } from '../../services';

export const PLACEMENT: { [placement: string]: MazuFloatingTargetPlacement } = {
  left: MazuFloatingTargetPlacement.BottomLeft,
  center: MazuFloatingTargetPlacement.Bottom,
  right: MazuFloatingTargetPlacement.BottomRight,
};

@Component({
  selector: 'mz-dropdown-menu',
  templateUrl: './dropdown-menu.component.html',
  styleUrls: ['./dropdown-menu.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [MazuDropdownMenuService],
})
export class MazuDropdownMenuComponent implements OnChanges, OnInit, OnDestroy {

  @Input() name!: string;
  @Input() placement: 'left' | 'center' | 'right' = 'center';
  @Input() offsetX = 0;
  @Input() offsetY = 0;
  @Input() actionSelected: string | null = null;

  @Output() actionClicked = new EventEmitter<string>();

  floatingPlacement: MazuFloatingTargetPlacement = MazuFloatingTargetPlacement.Bottom;

  private destroy$ = new Subject<void>();

  constructor(
    private dropdownMenuService: MazuDropdownMenuService,
  ) {}

  ngOnChanges(changes: SimpleChanges) {
    if (didInputChange(changes['placement'])) {
      this.floatingPlacement = PLACEMENT[this.placement];
    }
  }

  ngOnInit() {
    this.dropdownMenuService.getSelectedAction()
      .pipe(
        takeUntil(this.destroy$),
        filter(action => action !== null),
      )
      .subscribe(action => this.actionClicked.emit(action as string));
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
