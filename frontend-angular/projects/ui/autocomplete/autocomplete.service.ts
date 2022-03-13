import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { FormOption } from '@/common';

@Injectable()
export class MazuAutocompleteService {
  _options$ = new BehaviorSubject<FormOption[]>([]);

  options$ = this._options$.asObservable();
}
