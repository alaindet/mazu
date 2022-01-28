import { NgModule } from '@angular/core';

import { MazuFloatingTriggerDirective } from './floating-trigger.directive';
import { MazuFloatingTargetDirective } from './floating-target.directive';

@NgModule({
  imports: [],
  declarations: [
    MazuFloatingTriggerDirective,
    MazuFloatingTargetDirective,
  ],
  exports: [
    MazuFloatingTriggerDirective,
    MazuFloatingTargetDirective,
  ],
})
export class MazuFloatingComponentModule {}
