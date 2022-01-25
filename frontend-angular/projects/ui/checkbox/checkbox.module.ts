import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { MazuCheckboxComponent } from './checkbox.component';

@NgModule({
  imports: [
    ReactiveFormsModule,
  ],
  declarations: [MazuCheckboxComponent],
  exports: [MazuCheckboxComponent],
})
export class MazuCheckboxComponentModule {}
