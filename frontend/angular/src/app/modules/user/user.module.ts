import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RoutingModule } from './/routing.module';

import { SharedModule } from '../shared/shared.module';

import { SigninComponent } from './components/signin/signin.component';
import { PasswordComponent } from './components/password/password.component';
import { SignupComponent } from './components/signup/signup.component';
import { VerifyComponent } from './components/verify/verify.component';
import { SignoutComponent } from './components/signout/signout.component';
import { ForgotPwComponent } from './components/forgot-pw/forgot-pw.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    RoutingModule
  ],
  declarations: [
    SigninComponent,
    PasswordComponent,
    SignupComponent,
    VerifyComponent,
    SignoutComponent,
    ForgotPwComponent
  ]
})
export class UserModule { }
