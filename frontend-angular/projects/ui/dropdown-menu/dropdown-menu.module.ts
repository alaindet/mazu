import { NgModule } from '@angular/core';

import { MazuFloatingModule } from '@/common/floating';
import { MazuDropdownMenuActionComponent, MazuDropdownMenuTriggerComponent } from './components';

@NgModule({
  imports: [
    MazuFloatingModule,
  ],
  declarations: [
    MazuDropdownMenuTriggerComponent,
    MazuDropdownMenuComponent,
    MazuDropdownMenuActionComponent,
  ],
  exports: [
    MazuDropdownMenuTriggerComponent,
    MazuDropdownMenuComponent,
    MazuDropdownMenuActionComponent,
  ],
})
export class MazuDropdownMenuComponentModule {}
