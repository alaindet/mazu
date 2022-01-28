import { Component, ViewChild, ElementRef } from '@angular/core';
import { fromEvent } from 'rxjs';
import { computePosition, offset, flip, shift } from '@floating-ui/dom';

@Component({
  templateUrl: './floating.component.html',
  styleUrls: ['./floating.component.scss'],
})
export class DemoFloatingComponent {

  @ViewChild('targetRef', { static: true })
  targetRef!: ElementRef;

  @ViewChild('triggerRef', { static: true })
  triggerRef!: ElementRef;

  showTooltip = false;

  ngOnInit(): void {
    this.targetRef.nativeElement.style.display = 'none';

    console.log('this.triggerRef.nativeElement', this.triggerRef.nativeElement);

    fromEvent(this.triggerRef.nativeElement, 'click')
      .subscribe(() => this.toggleTooltip());
  }

  private toggleTooltip(): void {
    // Hiding
    if (this.showTooltip) {
      this.showTooltip = false;
      this.targetRef.nativeElement.style.display = 'none';
      return;
    }

    // Showing
    this.showTooltip = true;
    this.targetRef.nativeElement.style.display = 'block';
    this.update();
  }

  private update(): void {
    computePosition(this.triggerRef.nativeElement, this.targetRef.nativeElement, {
      placement: 'top',
      middleware: [
        offset(6),
        flip(),
        shift({ padding: 6 }),
      ],
    }).then(({ x, y }) => {
      Object.assign(this.targetRef.nativeElement.style, {
        left: `${x}px`,
        top: `${y}px`,
      });
    });
  }
}
