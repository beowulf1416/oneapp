import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { SecurityService } from '../../services/security.service';
import { ApiResult } from '../../../../classes/api-result';
import { MessagesService } from '../../../../services/messages.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-permission',
  templateUrl: './permission.component.html',
  styleUrls: ['./permission.component.css']
})
export class PermissionComponent implements OnInit {

  form = {
    id: '',
    name: '',
    description: ''
  };

  constructor(
    private title: Title,
    private security: SecurityService,
    private messages: MessagesService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.title.setTitle('Permission');

    this.route.params.subscribe((p: Params) => {
      const permission_id = p.id;
      if (permission_id) {
        this.security.get_permission(permission_id).subscribe((r: ApiResult) => {
          if (r.status) {
            if (r.data && r.data.permission) {
              const permission = r.data.permission;
              this.form.id = permission.id;
              this.form.name = permission.name;
              this.form.description = permission.description;
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

  new() {
    console.log('new');
  }

  save() {
    console.log('save');
    this.security.create_permission(this.form.name, this.form.description).subscribe((r: ApiResult) => {
      if (r.status) {
        // if (r.data && r.data.permission) {
          // const permission = r.data.permission;
          this.router.navigate(['admin', 'security', 'permissions']);
        // } else {
        //   console.log(r);
        // }
      } else {
        r.errors.forEach(e => {
          this.messages.error(e);
        });
      }
    });
  }
}
