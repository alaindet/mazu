import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MazuFloatingService } from './services';
import { MazuFloatingTargetDirective, MazuFloatingTriggerDirective } from './directives';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    MazuFloatingTargetDirective,
    MazuFloatingTriggerDirective,
  ],
  exports: [
    MazuFloatingTargetDirective,
    MazuFloatingTriggerDirective,
  ],
  providers: [
    MazuFloatingService,
  ],
})
export class MazuFloatingModule {}
