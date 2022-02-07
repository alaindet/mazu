import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { MazuDropdownMenuComponent } from './dropdown-menu.component';

@NgModule({
  imports: [
    ReactiveFormsModule,
  ],
  declarations: [MazuDropdownMenuComponent],
  exports: [MazuDropdownMenuComponent],
})
export class MazuDropdownMenuComponentModule {}
