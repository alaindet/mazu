import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MazuFloatingService } from './services';
import { MazuFloatingHostComponent } from './components';
import { MazuFloatingTargetDirective, MazuFloatingTriggerDirective, MazuFloatingTemplateDirective } from './directives';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    MazuFloatingTargetDirective,
    MazuFloatingTriggerDirective,
    MazuFloatingTemplateDirective,
    MazuFloatingHostComponent,
  ],
  exports: [
    MazuFloatingTargetDirective,
    MazuFloatingTriggerDirective,
    MazuFloatingTemplateDirective,
    MazuFloatingHostComponent,
  ],
  providers: [
    MazuFloatingService,
  ],
})
export class MazuFloatingModule {}
