import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { selectJwt } from '../store';

@Injectable()
export class JwtInterceptorService implements HttpInterceptor {

  private jwt!: string | null;

  constructor(private store: Store) {
    this.store.select(selectJwt).subscribe(jwt => this.jwt = jwt);
  }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // TODO: Add other exclusion clauses?
    if (this.jwt === null) {
      return next.handle(request);
    }

    return next.handle(
      request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.jwt}`,
        },
      })
    );

    // TODO: Error handling
    // return next.handle(request).pipe(
    //   catchError((err) => {
    //     if (err instanceof HttpErrorResponse) {
    //       if (err.status === 401) {
    //         // redirect user to the logout page
    //       }
    //     }
    //     return throwError(err);
    //   })
    // );

    // TODO: Start/stop global spinner
    // this.spinner = true;
    // return next.handle(request).pipe(
    //   finalize(() => this.spinner = false),
    // );
  }
}
