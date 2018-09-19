import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { Observable, NextObserver } from 'rxjs';
import { User } from './user';

@Injectable()
export class AuthGuard implements CanActivate {

    private user$: Observable<User>;

    constructor(
        private router: Router,
        private user: UserService
    ) {
        this.user$ = user.user$;
    }

    canActivate() {
        return Observable.create((observer: NextObserver<boolean>) => {
            this.user$.subscribe((user: User) => {
                console.log('authguard', user);
                if (!user.is_signed_in) {
                    console.log('redirect...');
                    this.router.navigate([ 'user', 'signin' ]);
                }

                observer.next(user.is_signed_in);
                observer.complete();
            });
        });
    }
}
