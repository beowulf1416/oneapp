import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RoutingModule } from './/routing.module';

import { HomeComponent } from './components/home/home.component';
import { PermissionComponent } from './components/permission/permission.component';
import { PermissionsComponent } from './components/permissions/permissions.component';
import { RoleComponent } from './components/role/role.component';
import { RolesComponent } from './components/roles/roles.component';
import { UserComponent } from './components/user/user.component';
import { UsersComponent } from './components/users/users.component';
import { MainComponent } from './components/main/main.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RoutingModule
  ],
  declarations: [
    HomeComponent,
    PermissionComponent,
    PermissionsComponent,
    RoleComponent,
    RolesComponent,
    UserComponent,
    UsersComponent,
    MainComponent
  ]
})
export class AdminauthModule { }
