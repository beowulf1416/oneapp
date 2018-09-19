import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes, Router } from '@angular/router';

import { AuthGuard } from '../../classes/auth-guard';

import { SigninComponent } from './components/signin/signin.component';
import { PasswordComponent } from './components/password/password.component';
import { SignupComponent } from './components/signup/signup.component';
import { SignoutComponent } from './components/signout/signout.component';
import { VerifyComponent } from './components/verify/verify.component';


const routes: Routes = [
  {
    path: 'user',
    children: [
      {
        path: 'signout',
        canActivate: [ AuthGuard ],
        component: SignoutComponent
      },
      {
        path: 'signup',
        children: [
          {
            path: '',
            component: SignupComponent
          },
          {
            path: ':token',
            component: VerifyComponent
          }
        ]
      },
      {
        path: 'signin',
        component: SigninComponent
      },
      {
        path: 'change-password',
        canActivate: [ AuthGuard ],
        component: PasswordComponent
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
