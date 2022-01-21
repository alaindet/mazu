import { Component } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { signIn, selectUserIsLoading, selectJwt, selectLists, selectListsAreLoading } from './core/store';
import * as listsAction from './core/store/features/lists/actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  userIsLogged$ = this.store.select(selectJwt).pipe(map(jwt => !!jwt));
  lists$ = this.store.select(selectLists);
  anythingIsLoading$!: Observable<boolean>;

  // TODO: Remove
  private FAKE_EMAIL = 'john.doe@example.com';
  private FAKE_PASSWORD = 'john.doe@example.com';
  private FAKE_TITLE = 'Foo list';
  private FAKE_MODIFIED_TITLE = 'Foo modified list';
  private FAKE_DESCRIPTION = 'A description';
  private FAKE_MODIFIED_DESCRIPTION = 'A modified description';
  private FAKE_ID = '';

  constructor(
    private store: Store,
  ) {}

  ngOnInit(): void {
    this.store.select(selectLists).subscribe(lists => {
      const list = lists.find(list => list.name === this.FAKE_TITLE);
      if (list) this.FAKE_ID = list.listId;
    });

    this.anythingIsLoading$ = combineLatest([
      this.store.select(selectUserIsLoading),
      this.store.select(selectListsAreLoading),
    ]).pipe(map(loaders => loaders.some(loader => loader)));
  }

  onSignIn(): void {
    this.store.dispatch(signIn({
      email: this.FAKE_EMAIL,
      password: this.FAKE_PASSWORD,
    }));
  }

  onCreateList(): void {
    this.store.dispatch(
      listsAction.createList({
        name: this.FAKE_TITLE,
        description: this.FAKE_DESCRIPTION,
      })
    );
  }

  onGetAllLists(): void {
    this.store.dispatch(
      listsAction.getAllLists()
    );
  }

  onMarkAsFavorite(): void {
    this.store.dispatch(
      listsAction.markListAsFavorite({
        listId: this.FAKE_ID,
      })
    );
  }

  onUnmarkAsFavorite(): void {
    this.store.dispatch(
      listsAction.unmarkListAsFavorite({
        listId: this.FAKE_ID,
      })
    );
  }

  onUpdateList(): void {
    this.store.dispatch(
      listsAction.updateList({
        listId: this.FAKE_ID,
        name: this.FAKE_MODIFIED_TITLE,
        description: this.FAKE_MODIFIED_DESCRIPTION,
      })
    );
  }

  onDeleteList(): void {
    this.store.dispatch(
      listsAction.deleteList({
        listId: this.FAKE_ID,
      })
    );
  }
}
