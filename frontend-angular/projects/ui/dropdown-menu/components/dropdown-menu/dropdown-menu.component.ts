import { ChangeDetectionStrategy, Component, ContentChildren, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, QueryList, SimpleChanges, ViewEncapsulation } from '@angular/core';

import { didInputChange } from '@/common';
import { MazuDropdownMenuActionComponent } from '../dropdown-menu-action/dropdown-menu-action.component';
import { MazuDropdownMenuService } from '../../services/dropdown-menu.service';
import { filter, Subject, takeUntil } from 'rxjs';
import { MazuFloatingTargetPlacement } from '@/common/floating/types';

export const PLACEMENT: { [placement: string]: MazuFloatingTargetPlacement } = {
  left: MazuFloatingTargetPlacement.BottomLeft,
  center: MazuFloatingTargetPlacement.Bottom,
  right: MazuFloatingTargetPlacement.BottomRight,
};

@Component({
  selector: 'mz-dropdown-menu',
  templateUrl: './dropdown-menu.component.html',
  styleUrls: ['./dropdown-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class MazuDropdownMenuComponent implements OnChanges, OnInit, OnDestroy {

  @Input() name!: string;
  @Input() placement: 'left' | 'center' | 'right' = 'center';
  @Input() offsetY = 0;
  @Input() offsetX = 0;
  @Input() actionSelected: string | null = null;

  @Output() actionClicked = new EventEmitter<string>();

  @ContentChildren(MazuDropdownMenuActionComponent)
  actions!: QueryList<MazuDropdownMenuActionComponent>;

  floatingPlacement: MazuFloatingTargetPlacement = MazuFloatingTargetPlacement.Bottom;

  private destroy$ = new Subject<void>();
  private emitEvents = true;

  constructor(
    private dropdownMenuService: MazuDropdownMenuService,
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (didInputChange(changes['actionSelected'])) {
      this.emitEvents = false;
      this.dropdownMenuService.selectAction(this.actionSelected);
      setTimeout(() => this.emitEvents = true);
    }
    if (didInputChange(changes['placement'])) {
      this.floatingPlacement = PLACEMENT[this.placement];
    }
  }

  ngOnInit(): void {
    this.dropdownMenuService.selectedAction$
      .pipe(
        takeUntil(this.destroy$),
        filter(action => this.emitEvents && action !== null)
      )
      .subscribe(action => this.actionClicked.emit(action as string));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
