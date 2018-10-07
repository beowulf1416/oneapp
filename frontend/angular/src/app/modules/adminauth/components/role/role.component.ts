import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { SecurityService } from '../../services/security.service';
import { ApiResult } from '../../../../classes/api-result';
import { MessagesService } from '../../../../services/messages.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css']
})
export class RoleComponent implements OnInit {

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
    this.title.setTitle('Role');
    this.route.params.subscribe((p: Params) => {
      const role_id = p.id;
      if (role_id) {
        this.security.get_role(role_id).subscribe((r: ApiResult) => {
          if (r.status) {
            if (r.data && r.data.role) {
              const role = r.data.role;
              this.form.id = role.id;
              this.form.name = role.name;
              this.form.description = role.description;
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
    this.security.create_role(this.form.name, this.form.description).subscribe((r: ApiResult) => {
      if (r.status) {
        this.router.navigate(['admin', 'security', 'roles']);
      } else {
        r.errors.forEach(e => {
          this.messages.error(e);
        });
      }
    });
  }
}
