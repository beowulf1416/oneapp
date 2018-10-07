import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { SecurityService } from '../../services/security.service';
import { Router } from '@angular/router';
import { ApiResult } from '../../../../classes/api-result';
import { MessagesService } from '../../../../services/messages.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users = [];
  page = {
    order: '',
    direction: '',
    items: 10,
    offset: 0
  };

  constructor(
    private title: Title,
    private service: SecurityService,
    private messages: MessagesService,
    private router: Router
  ) { }

  ngOnInit() {
    this.title.setTitle('Users');
    this.service.get_users(this.page.order, this.page.direction, this.page.items, this.page.offset).subscribe((r: ApiResult) => {
      if (r.status) {
        this.users = r.data.users;
      } else {
        r.errors.forEach(e => {
          this.messages.error(e);
        });
      }
    });
  }

  new() {
    this.router.navigate(['admin', 'security', 'users', 'new']);
  }

  set_current(user) {
    console.log(user);
  }
}
