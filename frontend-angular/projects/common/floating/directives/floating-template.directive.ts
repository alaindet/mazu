import { Directive, Input, TemplateRef } from '@angular/core';

import { MazuFloatingService } from '../services';

@Directive({
  selector: '[mzFloatingTemplate]',
})
export class MazuFloatingTemplateDirective {

  @Input('mzFloatingTemplate') name!: string;

  constructor(
    private templateRef: TemplateRef<any>,
    private floatingService: MazuFloatingService,
  ) {}

  ngOnInit(): void {
    this.floatingService.setTemplate(this.name, this.templateRef);
  }
}
