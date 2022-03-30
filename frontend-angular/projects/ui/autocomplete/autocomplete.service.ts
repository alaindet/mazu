import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { FormOption } from '@/common';

@Injectable()
export class MazuAutocompleteService {
  private options: FormOption[] = [];
  private _filteredOptions$ = new BehaviorSubject<FormOption[]>([]);

  // TODO
  // - Candidate: highlighted option that could be confirmed
  // - Confirmed/selected: user-confirmed option
  private _candidateOption$ = new BehaviorSubject<any | null>(null);
  private _selectedOption$ = new BehaviorSubject<any | null>(null);

  filter = '';

  get options$(): Observable<FormOption[]> {
    return this._filteredOptions$.asObservable();
  }

  setOptions(options: FormOption[]): void {
    console.log('setOptions', options);
    this.options = options;
    this.updateOptions();
  }

  setFilter(filter: string): void {
    this.filter = filter;
    this.updateOptions();
  }

  resetFilter(): void {
    this.filter = '';
    this.updateOptions();
  }

  private updateOptions(): void {
    // TODO...
    console.log('updateOptions');
  }
}
