import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { PermissionComponent } from './components/permission/permission.component';
import { PermissionsComponent } from './components/permissions/permissions.component';

const routes: Routes = [
  {
    path: 'admin',
    children: [
      {
        path: '',
        component: HomeComponent
      },
      {
        path: 'permissions',
        children: [
          {
            path: '',
            component: PermissionsComponent
          },
          {
            path: 'new',
            component: PermissionComponent
          },
          {
            path: ':id',
            component: PermissionComponent
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class RoutingModule { }
