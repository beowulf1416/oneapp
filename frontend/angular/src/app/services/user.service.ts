import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Store, select } from '@ngrx/store';

import { Observable, NextObserver } from 'rxjs';

import { State } from '../classes/state';
import * as user from '../classes/reducers/user';
// import { State } from '../classes/reducers/user';

import { User } from '../classes/user';
import { ApiResult } from '../classes/api-result';
import { URLS } from '../classes/urls';
// import { UserActions } from '../classes/reducers/user';
import * as userActions from '../classes/actions/user';


function get_session_storage(): any {
  return window.sessionStorage;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public user$: Observable<User>;

  constructor(
    private http: HttpClient,
    private s: Store<State>
  ) {
    this.user$ = s.pipe(
      select((state: State) => state.user),
      select((state: user.State) => state.user)
    );
  }

  // get_current_user(): Observable<ApiResult> {
  //   return this.http.post<ApiResult>(URLS.api_get_current_user, JSON.stringify({}));
  // }

  sign_in(email: string, password: string): Observable<ApiResult> {
    return Observable.create((observer: NextObserver<ApiResult>) => {
      this.http.post<ApiResult>(URLS.api_sign_in, JSON.stringify({
        email: email,
        password: password
      })).subscribe((r: ApiResult) => {
        if (r.status) {
          console.log(r);
          const u = r.data.user;
          // const token = r.data.token;
          const authenticated = u.authenticated;
          const permissions = u.permissions;

          const session = get_session_storage();
          session.setItem('email', email);
          session.setItem('permissions', JSON.stringify(permissions));

          this.s.dispatch(new userActions.SignIn(
            new User(email, authenticated, permissions)
          ));
        } else {
          console.error(r);
        }
        observer.next(r);
        observer.complete();
      });
    });
  }

  sign_out(): Observable<ApiResult> {
    return Observable.create((observer: NextObserver<ApiResult>) => {
      this.user$.subscribe(u => {
        console.log(u);

        this.http.post<ApiResult>(URLS.api_sign_out, JSON.stringify({
        })).subscribe((r: ApiResult) => {
          if (r.status) {
            const session = get_session_storage();
            session.clear();

            this.s.dispatch(new userActions.SignOut());
          }

          observer.next(r);
          observer.complete();
        });
      });
    });
  }

  // user_test() {
  //   this.http.post<ApiResult>('https://api.app.local/user/test', JSON.stringify({}))
  //     .subscribe((r: ApiResult) => {
  //       console.log(r);
  //   });
  // }
}
