import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { signIn } from './core/store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(
    private store: Store,
  ) {}

  onSignIn(): void {
    const email = 'john.doe@example.com'; // TODO
    const password = 'john.doe@example.com'; // TODO
    this.store.dispatch(signIn({ email, password }));
  }
}
