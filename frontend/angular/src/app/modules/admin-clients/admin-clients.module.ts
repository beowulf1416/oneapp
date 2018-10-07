import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RoutingModule } from './routing.module';

import { HomeComponent } from './components/home/home.component';
import { ClientsComponent } from './components/clients/clients.component';
import { ClientComponent } from './components/client/client.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RoutingModule
  ],
  declarations: [
    HomeComponent,
    ClientsComponent,
    ClientComponent
  ]
})
export class AdminClientsModule { }
