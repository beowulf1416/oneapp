import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RoutingModule } from './/routing.module';

import { SigninComponent } from './components/signin/signin.component';
import { PasswordComponent } from './components/password/password.component';
import { SignupComponent } from './components/signup/signup.component';
import { VerifyComponent } from './components/verify/verify.component';
import { SignoutComponent } from './components/signout/signout.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RoutingModule
  ],
  declarations: [
    SigninComponent,
    PasswordComponent,
    SignupComponent,
    VerifyComponent,
    SignoutComponent
  ]
})
export class UserModule { }
