import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class MazuDropdownMenuService {
  private _selectedAction$ = new BehaviorSubject<string | null>(null);

  getSelectedAction(): Observable<string | null> {
    return this._selectedAction$.asObservable();
  }

  setSelectedAction(actionName: string | null) {
    this._selectedAction$.next(actionName);
  }
}
