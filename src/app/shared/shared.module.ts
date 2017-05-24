import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RippleDirective } from './ripple.directive';
import { TileComponent } from './tile/tile.component';


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
  ],
  declarations: [
    RippleDirective,
    TileComponent,
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
  ]
})
export class SharedModule { }
