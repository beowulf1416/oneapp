import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoutingModule } from './routing.module';

import { StoreModule } from '@ngrx/store';

import { reducers } from './classes/state';

import { HomeComponent } from './components/home/home.component';
import { MapComponent } from './components/map/map.component';

@NgModule({
  imports: [
    CommonModule,
    RoutingModule,
    StoreModule.forFeature(
      'gis', reducers
    )
  ],
  declarations: [
    HomeComponent,
    MapComponent
  ]
})
export class GisModule { }
