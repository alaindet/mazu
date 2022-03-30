import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { FormOption } from '@/common';

@Injectable()
export class MazuAutocompleteService {

  // TODO
  // - Candidate: highlighted option that could be confirmed
  // - Confirmed/selected: user-confirmed option
  private _candidateOption$ = new BehaviorSubject<any | null>(null);
  private _selectedOption$ = new BehaviorSubject<any | null>(null);
  private _filteredOptions$ = new BehaviorSubject<FormOption[]>([]);
  private options: FormOption[] = [];
  private hashedOptions: string[] = [];

  filter = '';

  get options$(): Observable<FormOption[]> {
    return this._filteredOptions$.asObservable();
  }

  get selectedOption$(): Observable<any> {
    return this._selectedOption$.asObservable();
  }

  get candidateOption$(): Observable<any> {
    return this._candidateOption$.asObservable();
  }

  selectOption(value: any): void {
    this._selectedOption$.next(value);
  }

  resetSelectedOption(): void {
    this._selectedOption$.next(null);
  }

  candidateOption(value: any): void {
    this._candidateOption$.next(value);
  }

  resetCandidateOption(): void {
    this._candidateOption$.next(null);
  }

  setOptions(options: FormOption[]): void {
    this.options = options;
    this.hashedOptions = options.map(opt => JSON.stringify(opt.value).toLowerCase());
    this.filterOptions(this.filter);
  }

  setFilter(filter: string): void {
    this.filter = filter;
    this.filterOptions(filter);
  }

  resetFilter(): void {
    this.filter = '';
    this.filterOptions('');
  }

  private filterOptions(filter: string): void {

    const filteredOptions = filter
      ? this.options.filter((_, i) => this.hashedOptions[i].includes(filter))
      : [...this.options];

    this._filteredOptions$.next(filteredOptions);
  }
}
