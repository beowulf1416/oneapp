import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { UserService } from '../../../../services/user.service';
import { ApiResult } from '../../../../classes/api-result';

@Component({
  selector: 'app-signout',
  templateUrl: './signout.component.html',
  styleUrls: ['./signout.component.css']
})
export class SignoutComponent implements OnInit {

  constructor(
    private title: Title,
    private user: UserService
  ) { }

  ngOnInit() {
    this.user.sign_out().subscribe((r: ApiResult) => {
      console.log('signout');
      console.log(r);
    });
  }

}
