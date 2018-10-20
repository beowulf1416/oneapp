import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../modules/shared/shared.module';
import { RoutingModule } from './routing.module';

import { MainComponent } from './components/main/main.component';
import { ItemsComponent } from './components/items/items.component';

@NgModule({
  imports: [
    CommonModule,
    RoutingModule,
    SharedModule
  ],
  declarations: [
    MainComponent,
    ItemsComponent
  ]
})
export class InventoryModule { }
