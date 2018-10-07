import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './classes/auth-guard';

import { WelcomeComponent } from './components/welcome/welcome.component';

const routes: Routes = [
  {
    path: '',
    component: WelcomeComponent
  },
  {
    path: 'user',
    loadChildren: './modules/user/user.module#UserModule'
  },
  {
    path: 'admin',
    children: [
      {
        path: 'clients',
        loadChildren: './modules/admin-clients/admin-clients.module#AdminClientsModule'
      },
      {
        path: 'security',
        loadChildren: './modules/adminauth/adminauth.module#AdminauthModule'
      }
    ]
  },
  {
    path: 'inventory',
    loadChildren: './modules/inventory/inventory.module#InventoryModule'
  },
  {
    path: 'gis',
    loadChildren: './modules/gis/gis.module#GisModule'
  },
  {
    path: 'work',
    loadChildren: './modules/work/work.module#WorkModule'
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  providers: [
    AuthGuard
  ],
  declarations: []
})
export class RoutingModule { }
