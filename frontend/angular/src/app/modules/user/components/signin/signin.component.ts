import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { UserService } from '../../../../services/user.service';
import { ApiResult } from '../../../../classes/api-result';
import { MessagesService } from '../../../../services/messages.service';
import { Router } from '@angular/router';

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

  constructor(
    private title: Title,
    private user: UserService,
    private messages: MessagesService,
    private router: Router
  ) { }

  ngOnInit() {
    this.title.setTitle('Sign In');
  }

  signin() {
    console.log('signin');
    this.user.sign_in(this.form.email, this.form.pw).subscribe((r: ApiResult) => {
      if (r.status) {
        if (r.data.authenticated) {
          console.log('signed in');
        }
      } else {
        r.errors.forEach(e => {
          this.messages.error(e);
        });
      }
    });
  }
}
