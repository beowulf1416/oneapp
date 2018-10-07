import { Component, OnInit } from '@angular/core';
import { ClientsService } from '../../services/clients.service';
import { ApiResult } from '../../../../classes/api-result';
import { MessagesService } from '../../../../services/messages.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {

  clients = [];

  constructor(
    private service: ClientsService,
    private messages: MessagesService,
    private router: Router
  ) { }

  ngOnInit() {
    this.service.get_clients().subscribe((r: ApiResult) => {
      if (r.status) {
        if (r.data && r.data.clients) {
          this.clients = r.data.clients;
        } else {
          r.errors.forEach(e => {
            this.messages.error(e);
          });
        }
      }
    });
  }

  new() {
    this.router.navigate(['admin', 'clients', 'new' ]);
  }
}
