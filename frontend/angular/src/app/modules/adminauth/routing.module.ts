import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { MainComponent } from './components/main/main.component';
import { HomeComponent } from './components/home/home.component';
import { PermissionComponent } from './components/permission/permission.component';
import { PermissionsComponent } from './components/permissions/permissions.component';
import { RolesComponent } from './components/roles/roles.component';
import { RoleComponent } from './components/role/role.component';
import { UsersComponent } from './components/users/users.component';
import { UserComponent } from './components/user/user.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
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
      },
      {
        path: 'roles',
        children: [
          {
            path: '',
            component: RolesComponent
          },
          {
            path: 'new',
            component: RoleComponent
          },
          {
            path: ':id',
            component: RoleComponent
          }
        ]
      },
      {
        path: 'users',
        children: [
          {
            path: '',
            component: UsersComponent
          },
          {
            path: 'new',
            component: UserComponent
          },
          {
            path: ':id',
            component: UserComponent
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
