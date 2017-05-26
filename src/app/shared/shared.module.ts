import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RippleDirective } from './ripple.directive';
import { TileComponent } from './tile/tile.component';
import { ChartsModule } from 'ng2-charts';


import {
  MdIconModule,
  MdCardModule,
  MdListModule,
  MdSidenavModule,
  MdGridListModule,
  MdButtonModule,
  MdInputModule,
  MdMenuModule,
  MdProgressBarModule,
  MdToolbarModule,
  MdNativeDateModule,
  MdDatepickerModule,
} from '@angular/material';
import { FullscreenDirective } from './fullscreen.directive';

@NgModule({
  imports: [
    CommonModule,
    MdIconModule,
    MdCardModule,
    MdListModule,
    MdSidenavModule,
    MdGridListModule,
    MdButtonModule,
    MdInputModule,
    MdProgressBarModule,
    MdMenuModule,
    MdToolbarModule,
    MdDatepickerModule,
    MdNativeDateModule,
    ChartsModule,
  ],
  declarations: [
    RippleDirective,
    TileComponent,
    FullscreenDirective,
  ],
  exports: [
    RippleDirective,
    MdIconModule,
    TileComponent,
    MdCardModule,
    MdListModule,
    MdSidenavModule,
    MdGridListModule,
    MdButtonModule,
    MdInputModule,
    MdProgressBarModule,
    MdMenuModule,
    MdToolbarModule,
    MdDatepickerModule,
    MdNativeDateModule,
    ChartsModule,
    FullscreenDirective,
  ],
  providers: [
  ]
})
export class SharedModule { }
