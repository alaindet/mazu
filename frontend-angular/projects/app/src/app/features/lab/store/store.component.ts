import { Component } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { signIn, selectUserIsLoading, selectJwt, selectLists, selectItems, selectListsAreLoading } from '@/app/core/store';
import * as listsAction from '@/app/core/store/features/lists/actions';
import * as itemsAction from '@/app/core/store/features/items/actions';

@Component({
  templateUrl: './store.component.html',
})
export class LabStoreFeatureComponent {

  userIsLogged$ = this.store.select(selectJwt).pipe(map(jwt => !!jwt));
  lists$ = this.store.select(selectLists);
  items$ = this.store.select(selectItems);
  anythingIsLoading$!: Observable<boolean>;

  private FAKE_USER_EMAIL = 'john.doe@example.com';
  private FAKE_USER_PASSWORD = 'john.doe@example.com';

  private FAKE_LIST_TITLE = 'Foo list';
  private FAKE_LIST_MODIFIED_TITLE = 'Foo modified list';
  private FAKE_LIST_DESCRIPTION = 'A description';
  private FAKE_LIST_MODIFIED_DESCRIPTION = 'A modified description';
  private FAKE_LIST_ID = '';

  private FAKE_ITEM_ONE_ID = '';
  private FAKE_ITEM_ONE_NAME = 'Foo item';
  private FAKE_ITEM_ONE_AMOUNT = 2;
  private FAKE_ITEM_ONE_DESCRIPTION = 'The foo item';
  private FAKE_ITEM_ONE_MODIFIED_NAME = 'Modified: Foo item';
  private FAKE_ITEM_ONE_MODIFIED_AMOUNT = 1;
  private FAKE_ITEM_ONE_MODIFIED_DESCRIPTION = 'Modified: The foo item';

  private FAKE_ITEM_TWO_ID = '';
  private FAKE_ITEM_TWO_NAME = 'Bar item';
  private FAKE_ITEM_TWO_AMOUNT = 3;
  private FAKE_ITEM_TWO_DESCRIPTION = 'The bar item';
  private FAKE_ITEM_TWO_MODIFIED_NAME = 'Modified: Bar item';
  private FAKE_ITEM_TWO_MODIFIED_AMOUNT = 4;
  private FAKE_ITEM_TWO_MODIFIED_DESCRIPTION = 'Modified: The bar item';

  constructor(
    private store: Store,
  ) {}

  ngOnInit() {
    this.store.select(selectLists).subscribe(lists => {
      if (!lists || !lists?.length) {
        return;
      }
      const list = lists.find(list => (
        list.name === this.FAKE_LIST_TITLE ||
        list.name === this.FAKE_LIST_MODIFIED_TITLE
      ));
      if (list) this.FAKE_LIST_ID = list.listId;
    });

    this.store.select(selectItems).subscribe(items => {
      if (!items || !items?.length) {
        return;
      }
      items.forEach(item => {
        if (
          item.name === this.FAKE_ITEM_ONE_NAME ||
          item.name === this.FAKE_ITEM_ONE_MODIFIED_NAME
        ) {
          this.FAKE_ITEM_ONE_ID = item.itemId;
        }
        if (
          item.name === this.FAKE_ITEM_TWO_NAME ||
          item.name === this.FAKE_ITEM_TWO_MODIFIED_NAME
        ) {
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
      email: this.FAKE_USER_EMAIL,
      password: this.FAKE_USER_PASSWORD,
    }));
  }

  onCreateList(): void {
    this.store.dispatch(
      listsAction.createList({
        name: this.FAKE_LIST_TITLE,
        description: this.FAKE_LIST_DESCRIPTION,
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
        name: this.FAKE_LIST_MODIFIED_TITLE,
        description: this.FAKE_LIST_MODIFIED_DESCRIPTION,
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

  onUpdateItemOne(): void {
    this.store.dispatch(
      itemsAction.updateItem({
        itemId: this.FAKE_ITEM_ONE_ID,
        listId: this.FAKE_LIST_ID,
        name: this.FAKE_ITEM_ONE_MODIFIED_NAME,
        amount: this.FAKE_ITEM_ONE_MODIFIED_AMOUNT,
        description: this.FAKE_ITEM_ONE_MODIFIED_DESCRIPTION,
        isDone: false,
      })
    );
  }

  onDeleteItemOne(): void {
    this.store.dispatch(
      itemsAction.deleteItem({
        listId: this.FAKE_LIST_ID,
        itemId: this.FAKE_ITEM_ONE_ID,
      })
    );
  }

  onCreateItemTwo(): void {
    this.store.dispatch(
      itemsAction.createItem({
        listId: this.FAKE_LIST_ID,
        name: this.FAKE_ITEM_TWO_NAME,
        amount: this.FAKE_ITEM_TWO_AMOUNT,
        description: this.FAKE_ITEM_TWO_DESCRIPTION,
      })
    );
  }

  onMarkItemTwoAsDone(): void {
    this.store.dispatch(
      itemsAction.markItemAsDone({
        listId: this.FAKE_LIST_ID,
        itemId: this.FAKE_ITEM_TWO_ID,
      })
    );
  }

  onUnmarkItemTwoAsDone(): void {
    this.store.dispatch(
      itemsAction.unmarkItemAsDone({
        listId: this.FAKE_LIST_ID,
        itemId: this.FAKE_ITEM_TWO_ID,
      })
    );
  }

  onUpdateItemTwo(): void {
    this.store.dispatch(
      itemsAction.updateItem({
        itemId: this.FAKE_ITEM_TWO_ID,
        listId: this.FAKE_LIST_ID,
        name: this.FAKE_ITEM_TWO_MODIFIED_NAME,
        amount: this.FAKE_ITEM_TWO_MODIFIED_AMOUNT,
        description: this.FAKE_ITEM_TWO_MODIFIED_DESCRIPTION,
        isDone: false,
      })
    );
  }

  onDeleteItemTwo(): void {
    this.store.dispatch(
      itemsAction.deleteItem({
        listId: this.FAKE_LIST_ID,
        itemId: this.FAKE_ITEM_TWO_ID,
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

  onMarkAllAsDone(): void {
    this.store.dispatch(
      itemsAction.markAllItemsAsDone({
        listId: this.FAKE_LIST_ID,
      })
    );
  }

  onUnmarkAllAsDone(): void {
    this.store.dispatch(
      itemsAction.unmarkAllItemsAsDone({
        listId: this.FAKE_LIST_ID,
      })
    );
  }

  onDeleteAllDone(): void {
    this.store.dispatch(
      itemsAction.deleteAllDoneItems({
        listId: this.FAKE_LIST_ID,
      })
    );
  }

  onDeleteAll(): void {
    this.store.dispatch(
      itemsAction.deleteAllItems({
        listId: this.FAKE_LIST_ID,
      })
    );
  }
}
