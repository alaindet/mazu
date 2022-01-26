import { NgModule } from '@angular/core';

import { MazuFloatingReferenceDirective } from './floating-reference.directive';
import { MazuFloatingTargetDirective } from './floating-target.directive';

@NgModule({
  imports: [],
  declarations: [
    MazuFloatingReferenceDirective,
    MazuFloatingTargetDirective,
  ],
  exports: [
    MazuFloatingReferenceDirective,
    MazuFloatingTargetDirective,
  ],
})
export class MazuFloatingComponentModule {}
