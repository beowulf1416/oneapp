import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { SecurityService } from '../../services/security.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ApiResult } from '../../../../classes/api-result';
import { MessagesService } from '../../../../services/messages.service';
import { ClientsService } from '../../../admin-clients/services/clients.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  form = {
    id: '',
    email: '',
    active: false,
    clients: []
  };
  clients = [];

  constructor(
    private title: Title,
    private service: SecurityService,
    private service_clients: ClientsService,
    private messages: MessagesService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.title.setTitle('User');
    this.service_clients.get_clients().subscribe((r: ApiResult) => {
      if (r.status) {
        this.clients = r.data.clients;
        this.clients.forEach(c => {
          this.form.clients[c.id] = false;
        });
        // this.form.clients = r.data.clients;
      } else {
        r.errors.forEach(e => {
          this.messages.error(e);
        });
      }
    });
    this.route.params.subscribe((p: Params) => {
      const user_id = p.id;
      if (user_id) {
        this.service.get_user(user_id).subscribe((r: ApiResult) => {
          if (r.status) {
            if (r.data && r.data.user) {
              const user = r.data.user;
              this.form.id = user.id;
              this.form.active = user.active;
              this.form.email = user.email;
            } else {
              console.log(r.data);
            }
          } else {
            r.errors.forEach(e => {
              this.messages.error(e);
            });
          }
        });
      }
    });
  }

  save() {
    if (this.form.id === '') {
      this.service.create_user(this.form.email, this.form.clients).subscribe((r: ApiResult) => {
        if (r.status) {
          this.router.navigate(['admin', 'security', 'users']);
        } else {
          r.errors.forEach(e => {
            this.messages.error(e);
          });
        }
      });
    } else {
      console.log('//todo');
    }
  }

  change(event, client) {
    // console.log('event', event);
    // console.log('client', client);
    this.form.clients[client.id] = !this.form.clients[client.id];
  }
}
