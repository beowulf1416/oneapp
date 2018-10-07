import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoutingModule } from './routing.module';
import { MainComponent } from './components/main/main.component';
import { ItemsComponent } from './components/items/items.component';

@NgModule({
  imports: [
    CommonModule,
    RoutingModule
  ],
  declarations: [MainComponent, ItemsComponent]
})
export class InventoryModule { }
