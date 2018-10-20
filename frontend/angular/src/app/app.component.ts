import { Component, OnInit } from '@angular/core';

import { UserService } from './services/user.service';
import { Observable } from 'rxjs';
import { User } from './classes/user';
import { Session } from './classes/session';
import { MessagesService } from './services/messages.service';
import { Message } from './classes/message';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  app_name = 'APP';

  sidenav_open = false;

  private user$: Observable<User>;
  private messages$: Observable<Array<Message>>;

  constructor(
    private messages: MessagesService,
    private user: UserService
  ) {
    this.user$ = user.user$;
    this.messages$ = messages.messages$;
  }

  ngOnInit() {
    this.user$.subscribe((u: User) => {
      console.log(u);
    });
  }

  toggle_sidenav() {
    this.sidenav_open = !this.sidenav_open;
    console.log(this.sidenav_open);
  }
}
