import { ChangeDetectionStrategy, Component, HostBinding, Input, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'mz-input-group',
  templateUrl: './input-group.component.html',
  styleUrls: ['./input-group.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'mz-input-group',
  },
})
export class MazuInputGroupComponent implements OnInit {
  @Input() inputIconWidth?: string | number;

  @HostBinding('style.--input-icon-width')
  styleInputIconWidth = '24px';

  ngOnInit() {
    this.initInputIconWidth();
  }

  private initInputIconWidth(): void {
    if (!this.inputIconWidth) {
      return;
    }

    if (typeof this.inputIconWidth === 'number') {
      this.styleInputIconWidth = `${this.inputIconWidth}px`;
    }

    this.styleInputIconWidth = this.inputIconWidth as string;
  }
}
