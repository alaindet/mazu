import { NgModule } from '@angular/core';

import { MazuFloatingModule } from '@/common/floating';
import * as components from './components';

@NgModule({
  imports: [
    MazuFloatingModule,
  ],
  declarations: [
    components.MazuDropdownMenuActionComponent,
    components.MazuDropdownMenuComponent,
    components.MazuDropdownMenuTriggerComponent,
  ],
  exports: [
    components.MazuDropdownMenuActionComponent,
    components.MazuDropdownMenuComponent,
    components.MazuDropdownMenuTriggerComponent,
  ],
})
export class MazuDropdownMenuComponentModule {}
