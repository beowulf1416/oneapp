import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ClientsService } from '../../services/clients.service';
import { ApiResult } from '../../../../classes/api-result';
import { Router } from '@angular/router';
import { MessagesService } from '../../../../services/messages.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {

  form = {
    id: '',
    name: '',
    description: ''
  };

  constructor(
    private title: Title,
    private service: ClientsService,
    private messages: MessagesService,
    private router: Router
  ) { }

  ngOnInit() {
    this.title.setTitle('Client');
  }

  new() {

  }

  save() {
    if (this.form.id === '') {
      this.service.create_client(this.form.id, this.form.name, this.form.description).subscribe((r: ApiResult) => {
        if (r.status) {
          this.router.navigate(['admin', 'clients']);
        } else {
          r.errors.forEach(e => {
            this.messages.error(e);
          });
        }
      });
    } else {
      this.service.update_client(this.form.id, this.form.name, this.form.description).subscribe((r: ApiResult) => {
        if (r.status) {
          this.router.navigate(['admin', 'clients']);
        } else {
          r.errors.forEach(e => {
            this.messages.error(e);
          });
        }
      });
    }
  }

}
