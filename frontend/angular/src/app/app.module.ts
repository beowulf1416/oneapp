import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { StoreModule } from '@ngrx/store';

import { user } from './classes/reducers/user';
import { session } from './classes/reducers/session';
import { messages } from './classes/reducers/messages';

import { TokenInterceptor } from './classes/token-interceptor';

import { AppComponent } from './app.component';
import { RoutingModule } from './/routing.module';
import { WelcomeComponent } from './components/welcome/welcome.component';

// feature modules
import { UserModule } from './modules/user/user.module';
import { AdminauthModule } from './modules/adminauth/adminauth.module';


@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    StoreModule.forRoot({
      user: user,
      session: session,
      messages: messages
    }),
    UserModule,
    AdminauthModule,
    RoutingModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
