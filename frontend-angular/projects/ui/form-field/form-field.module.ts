import { NgModule } from '@angular/core';

import * as components from './components';

@NgModule({
  imports: [
    // ...
  ],
  declarations: [
    components.MazuFormFieldComponent,
    components.MazuFormFieldErrorComponent,
    components.MazuFormFieldHintComponent,
    components.MazuFormFieldLabelComponent,
  ],
  exports: [
    components.MazuFormFieldComponent,
    components.MazuFormFieldErrorComponent,
    components.MazuFormFieldHintComponent,
    components.MazuFormFieldLabelComponent,    
  ],
})
export class MazuFormFieldModule {}
