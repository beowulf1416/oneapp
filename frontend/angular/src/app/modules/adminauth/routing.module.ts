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
import { AuthGuard } from 'src/app/classes/auth-guard';

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
            canActivate: [ AuthGuard ],
            data: {
              permission: 'security.permissions.list'
            },
            component: PermissionsComponent
          },
          {
            path: 'new',
            canActivate: [ AuthGuard ],
            data: {
              permission: 'security.permissions.create'
            },
            component: PermissionComponent
          },
          {
            path: ':id',
            canActivate: [ AuthGuard ],
            data: {
              permission: 'security.permissions.view'
            },
            component: PermissionComponent
          }
        ]
      },
      {
        path: 'roles',
        children: [
          {
            path: '',
            canActivate: [ AuthGuard ],
            data: {
              permission: 'security.roles.list'
            },
            component: RolesComponent
          },
          {
            path: 'new',
            canActivate: [ AuthGuard ],
            data: {
              permission: 'security.roles.create'
            },
            component: RoleComponent
          },
          {
            path: ':id',
            canActivate: [ AuthGuard ],
            data: {
              permission: 'security.roles.view'
            },
            component: RoleComponent
          }
        ]
      },
      {
        path: 'users',
        children: [
          {
            path: '',
            canActivate: [ AuthGuard ],
            data: {
              permission: 'security.users.list'
            },
            component: UsersComponent
          },
          {
            path: 'new',
            canActivate: [ AuthGuard ],
            data: {
              permission: 'security.users.create'
            },
            component: UserComponent
          },
          {
            path: ':id',
            canActivate: [ AuthGuard ],
            data: {
              permission: 'security.users.view'
            },
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
