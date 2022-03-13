import { NgModule } from '@angular/core';

import { MazuInputComponent } from './input/input.component';
import { MazuInputGroupComponent } from './input-group/input-group.component';

@NgModule({
  imports: [],
  declarations: [
    MazuInputComponent,
    MazuInputGroupComponent,
  ],
  exports: [
    MazuInputComponent,
    MazuInputGroupComponent,
  ],
})
export class MazuInputComponentModule {}
