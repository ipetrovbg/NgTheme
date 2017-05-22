import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy, OnChanges
} from '@angular/core';

import { IHeaderOptions, Options } from './tile.interface';

@Component({
  selector: 'app-tile',
  templateUrl: './tile.component.html',
  styleUrls: ['./tile.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TileComponent implements OnInit, OnChanges {

  @Input('options') public options: Options = new Options();
  public headerOptions: IHeaderOptions;

  constructor() { }

  ngOnChanges( change ) {
    if ( change.options ) {
      this.options = new Options(change.options.currentValue);
    }
  }

  ngOnInit() {
    this.headerOptions = {
      'padding-top': this.options.header.padding.top,
      'padding-left': this.options.header.padding.left,
      'padding-right': this.options.header.padding.right,
      'padding-bottom': this.options.header.padding.bottom,
      'border-color': this.options.header.border.color,
      };
  }

}
