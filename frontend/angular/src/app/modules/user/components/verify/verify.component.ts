import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, ParamMap, Params, Router } from '@angular/router';
import { switchMap, map } from 'rxjs/operators';

import { UserService } from '../../services/user.service';
import { ApiResult } from '../../../../classes/api-result';
import { MessagesService } from '../../../../services/messages.service';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.css']
})
export class VerifyComponent implements OnInit {

  form = {
    email: '',
    pw1: '',
    pw2: ''
  };
  token = '';

  constructor(
    private title: Title,
    private route: ActivatedRoute,
    private router: Router,
    private user: UserService,
    private messages: MessagesService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(p => {
      this.token = p.token;
      this.user.fetch_email(this.token).subscribe((r: ApiResult) => {
        if (r.status) {
          this.form.email = r.data.email;
        } else {
          r.errors.forEach(e => {
            this.messages.error(e);
          });
        }
      });
    });
  }

  validate_passwords(): boolean {
    return (this.form.pw1 === this.form.pw2) && this.form.pw1.length > 8;
  }

  submit() {
    console.log('submit');
    if (this.validate_passwords()) {
      this.user.update_verified(this.token, this.form.pw1).subscribe(r => {
        if (r.status) {
          this.messages.info('Your account has been successfully verified.');
          this.router.navigate(['']);
        } else {
          r.errors.forEach(e => {
            this.messages.error(e);
          });
        }
      });
    } else {
      this.messages.error('Passwords do not match');
    }
  }

}
