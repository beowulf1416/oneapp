import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { reducers } from './classes/state';
import { UserEffects } from './classes/effects/user';
// import { user } from './classes/reducers/user';
// import { session } from './classes/reducers/session';
// import { messages } from './classes/reducers/messages';

import { TokenInterceptor } from './classes/token-interceptor';

import { AppComponent } from './app.component';
import { RoutingModule } from './/routing.module';
import { WelcomeComponent } from './components/welcome/welcome.component';

import { Window } from './classes/window';
import { Storage } from './classes/storage';

// feature modules
// import { UserModule } from './modules/user/user.module';
// import { AdminClientsModule } from './modules/admin-clients/admin-clients.module';
// import { AdminauthModule } from './modules/adminauth/adminauth.module';
import { SharedModule } from './modules/shared/shared.module';
// import { InventoryModule } from './modules/inventory/inventory.module';


@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    // StoreModule.forRoot({
    //   // user: user,
    //   // session: session,
    //   // messages: messages
    // }),
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([
      UserEffects
    ]),
    // UserModule,
    // AdminClientsModule,
    // AdminauthModule,
    RoutingModule,
    SharedModule,
    // InventoryModule
  ],
  exports: [
    BrowserAnimationsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    Window,
    Storage
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
