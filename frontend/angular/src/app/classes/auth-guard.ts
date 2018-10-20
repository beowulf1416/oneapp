import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
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

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return Observable.create((observer: NextObserver<boolean>) => {
            this.user$.subscribe((user: User) => {
                // console.log('authguard', user);
                let allow = true;
                if (!user.is_signed_in) {
                    allow = false;
                    console.log('redirect...');
                    this.router.navigate(
                        [ 'user', 'signin' ],
                        {
                        queryParams: {
                            url: state.url
                        }
                    });
                }

                if (route.data.permission && !user.has_permission(route.data.permission)) {
                    allow = false;
                    console.error(`user does not have permission: ${route.data.permission}`);
                }

                observer.next(allow);
                observer.complete();
            });
        });
    }
}
