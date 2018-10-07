import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { defer, Observable, BehaviorSubject } from 'rxjs';
import { Storage } from '../storage';

import * as userActions from '../actions/user';
import { User } from '../user';

@Injectable()
export class UserEffects {
    constructor(
        private actions: Actions,
        private storage: Storage
    ) {}

    @Effect()
    init: Observable<Action> = defer(() => {
        let token = this.storage.native_session_storage.getItem('token');
        let email = this.storage.native_session_storage.getItem('email');

        if (token == null) {
            token = '';
        }

        if (email == null) {
            email = '';
        }
        return new BehaviorSubject<Action>(new userActions.SignIn(new User(token, email)));
    });
}
