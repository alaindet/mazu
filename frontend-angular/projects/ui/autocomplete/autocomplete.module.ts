import { NgModule } from '@angular/core';

import { MazuAutocompleteComponent } from './autocomplete/autocomplete.component';
import { MazuAutocompleteItemComponent } from './autocomplete-item/autocomplete-item.component';

@NgModule({
  imports: [],
  declarations: [
    MazuAutocompleteComponent,
    MazuAutocompleteItemComponent,
  ],
  exports: [
    MazuAutocompleteComponent,
    MazuAutocompleteItemComponent,
  ],
})
export class MazuAutocompleteModule {}
