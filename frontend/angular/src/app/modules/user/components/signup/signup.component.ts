import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { UserService } from '../../services/user.service';
import { ApiResult } from '../../../../classes/api-result';
import { MessagesService } from '../../../../services/messages.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  form = {
    email: ''
  };

  constructor(
    private title: Title,
    private user: UserService,
    private messages: MessagesService
  ) { }

  ngOnInit() {
    this.title.setTitle('Sign Up');
  }

  submit() {
    console.log('submit', this.form);
    this.user.sign_up(
      this.form.email
    ).subscribe((r: ApiResult) => {
      if (r.status) {
        console.log('signup', r);
        r.messages.forEach((message: string) => {
          this.messages.info(message);
        });
      } else {
        console.error('signup', r);
      }
    }, error => {
      console.error(error);
    });
  }

}
