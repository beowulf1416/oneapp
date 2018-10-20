import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { UserService } from '../../../../services/user.service';
import { ApiResult } from '../../../../classes/api-result';
import { MessagesService } from '../../../../services/messages.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  form = {
    email: '',
    pw: ''
  };

  redirect_url: Observable<string>;

  constructor(
    private title: Title,
    private user: UserService,
    private messages: MessagesService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.title.setTitle('Sign In');
    this.redirect_url = this.route.queryParamMap.pipe(
      map((params: ParamMap) => params.get('url'))
    );
  }

  signin() {
    console.log('signin');
    this.user.sign_in(this.form.email, this.form.pw).subscribe((r: ApiResult) => {
      if (r.status) {
        if (r.data.authenticated) {
          console.log('authenticated');
          this.redirect_url.subscribe(url => {
            if (url === '') {
              this.router.navigate(['/']);
            } else {
              console.log('redirecting', url);
              this.router.navigateByUrl(url);
            }
          });
        }
      } else {
        r.errors.forEach(e => {
          this.messages.error(e);
        });
      }
    });
  }
}
