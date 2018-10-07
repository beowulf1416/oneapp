import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Store, select } from '@ngrx/store';

import { Observable, NextObserver } from 'rxjs';

import { State } from '../classes/reducers/user';
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
      select((state: State) => state.user)
    );

    // this.get_current_user().subscribe((r: ApiResult) => {
    //   if (r.status) {
    //     console.log(r);
    //   } else {
    //     console.error(r);
    //   }
    // });
  }

  get_current_user(): Observable<ApiResult> {
    return this.http.post<ApiResult>(URLS.api_get_current_user, JSON.stringify({}));
  }

  sign_in(email: string, password: string): Observable<ApiResult> {
    return Observable.create((observer: NextObserver<ApiResult>) => {
      this.http.post<ApiResult>(URLS.api_sign_in, JSON.stringify({
        email: email,
        password: password
      })).subscribe((r: ApiResult) => {
        if (r.status) {
          console.log(r);
          const user = r.data.user;
          const token = r.data.token;

          // this.session.sessionStorage.setItem('token', token);
          const session = get_session_storage();
          session.setItem('token', token);

          // this.s.dispatch({
          //   type: UserActions.USER_SIGNED_IN,
          //   payload: user
          // });
          this.s.dispatch(new userActions.SignIn(new User(token, email)));
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
          console.log(r);

          const session = get_session_storage();
          session.removeItem('token');

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
