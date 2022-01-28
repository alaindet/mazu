import { Inject, Injectable, OnDestroy } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { fromEvent, Observable, Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';

// TODO: Move to @/common library
@Injectable()
export class DocumentClickService implements OnDestroy {

	documentClick$: Observable<MouseEvent>;
  destroy$ = new Subject<void>();

  constructor(@Inject(DOCUMENT) private readonly documentRef: Document) {
    this.documentClick$ = fromEvent<MouseEvent>(this.documentRef, 'click')
      .pipe(takeUntil(this.destroy$));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  getOutsideClick(element: HTMLElement): Observable<MouseEvent> {
    // TODO
    return this.documentClick$;
    // return this.documentClick$.pipe(
    //   filter(clickEvent => !element.contains(clickEvent.target as HTMLElement)),
    // );
  }
}
