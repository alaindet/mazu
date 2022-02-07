import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class MazuDropdownMenuService implements OnDestroy {

  selectedAction$ = new BehaviorSubject<string | null>(null);

  ngOnDestroy(): void {
    this.selectedAction$.complete();
  }

  selectAction(action: string | null): void {
    this.selectedAction$.next(action);
  }
}
