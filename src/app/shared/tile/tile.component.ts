import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy, OnChanges
} from '@angular/core';

import { Options } from './tile.interface';

@Component({
  selector: 'app-tile',
  templateUrl: './tile.component.html',
  styleUrls: ['./tile.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TileComponent implements OnInit, OnChanges {

  @Input('options') public options: Options;

  constructor() {

  }

  ngOnChanges( change ) {
    // console.log(change);
  }

  ngOnInit() {
  }

}
