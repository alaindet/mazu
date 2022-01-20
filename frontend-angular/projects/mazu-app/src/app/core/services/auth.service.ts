import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'projects/mazu-app/src/environments/environment';

// TODO: Move away
export interface ServerResponse<T = any> {
  message: string;
  data?: T;
}


@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(
    private http: HttpClient,
  ) {}

  signIn(email: string, password: string): Observable<ServerResponse<{ jwt: string }>> {
    const url = `${environment.apiUrl}/auth/sign-in`;
    const body = { email, password };
    return this.http.post<ServerResponse<{ jwt: string }>>(url, body);
  }
}
