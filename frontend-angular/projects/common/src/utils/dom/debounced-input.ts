import { ElementRef } from '@angular/core';
import { Observable, fromEvent } from 'rxjs';
import { map, debounceTime } from 'rxjs/operators';

/**
 * Subscribes to the "keyup" event of an element (input, textarea) and returns
 * a "debounced" observable from it. Useful with autocompletes
 *
 * @param element ElementRef Target element to register listener on
 * @param delay number Debounce delay in milliseconds
 */
export const createDebouncedInputEvent = (
  element: ElementRef,
  delay: number = 400,
): Observable<string> => {
	return fromEvent<KeyboardEvent>(element.nativeElement, 'input')
		.pipe(
			map(event => (<HTMLInputElement>event.target).value),
			debounceTime(delay),
		);
};
