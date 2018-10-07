import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoutingModule } from './routing.module';

import { HomeComponent } from './components/home/home.component';

@NgModule({
  imports: [
    CommonModule,
    RoutingModule
  ],
  declarations: [HomeComponent]
})
export class GisModule { }
