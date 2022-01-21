import { Component } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { signIn, selectUserIsLoading, selectJwt, selectLists, selectItems, selectListsAreLoading } from './core/store';
import * as listsAction from './core/store/features/lists/actions';
import * as itemsAction from './core/store/features/items/actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
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
  private FAKE_LIST_ID = '';
  private FAKE_ITEM_ONE_ID = '';
  private FAKE_ITEM_ONE_NAME = 'Foo item';
  private FAKE_ITEM_ONE_AMOUNT = 2;
  private FAKE_ITEM_ONE_DESCRIPTION = 'The foo item';
  private FAKE_ITEM_TWO_ID = '';
  private FAKE_ITEM_TWO_NAME = 'Bar item';
  private FAKE_ITEM_TWO_AMOUNT = 3;
  private FAKE_ITEM_TWO_DESCRIPTION = 'The bar item';

  constructor(
    private store: Store,
  ) {}

  ngOnInit(): void {
    this.store.select(selectLists).subscribe(lists => {
      if (!lists || !lists?.length) {
        return;
      }
      const list = lists.find(list => list.name === this.FAKE_TITLE);
      if (list) this.FAKE_LIST_ID = list.listId;
    });

    this.store.select(selectItems).subscribe(items => {
      if (!items || !items?.length) {
        return;
      }
      items.forEach(item => {
        if (item.name === this.FAKE_ITEM_ONE_NAME) {
          this.FAKE_ITEM_ONE_ID = item.itemId;
        }
        if (item.name === this.FAKE_ITEM_TWO_NAME) {
          this.FAKE_ITEM_TWO_ID = item.itemId;
        }
      });
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
        listId: this.FAKE_LIST_ID,
      })
    );
  }

  onUnmarkAsFavorite(): void {
    this.store.dispatch(
      listsAction.unmarkListAsFavorite({
        listId: this.FAKE_LIST_ID,
      })
    );
  }

  onUpdateList(): void {
    this.store.dispatch(
      listsAction.updateList({
        listId: this.FAKE_LIST_ID,
        name: this.FAKE_MODIFIED_TITLE,
        description: this.FAKE_MODIFIED_DESCRIPTION,
      })
    );
  }

  onDeleteList(): void {
    this.store.dispatch(
      listsAction.deleteList({
        listId: this.FAKE_LIST_ID,
      })
    );
  }

  onCreateItemOne(): void {
    this.store.dispatch(
      itemsAction.createItem({
        listId: this.FAKE_LIST_ID,
        name: this.FAKE_ITEM_ONE_NAME,
        amount: this.FAKE_ITEM_ONE_AMOUNT,
        description: this.FAKE_ITEM_ONE_DESCRIPTION,
      })
    );
  }

  onGetItemsFromList(): void {
    this.store.dispatch(
      itemsAction.getAllItems({
        listId: this.FAKE_LIST_ID,
      })
    );
  }

  onMarkItemOneAsDone(): void {
    this.store.dispatch(
      itemsAction.markItemAsDone({
        listId: this.FAKE_LIST_ID,
        itemId: this.FAKE_ITEM_ONE_ID,
      })
    );
  }

  onUnmarkItemOneAsDone(): void {
    this.store.dispatch(
      itemsAction.unmarkItemAsDone({
        listId: this.FAKE_LIST_ID,
        itemId: this.FAKE_ITEM_ONE_ID,
      })
    );
  }

  onUpdateItem(): void {
    this.store.dispatch(
      itemsAction.updateItem({
        itemId: this.FAKE_ITEM_ONE_ID,
        listId: this.FAKE_LIST_ID,
        // name?: string;
        // amount?: number;
        // description?: string;
        // isDone?: boolean;
      })
    );
  }
}
