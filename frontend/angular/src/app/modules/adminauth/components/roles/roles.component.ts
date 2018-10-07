import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { SecurityService } from '../../services/security.service';
import { ApiResult } from '../../../../classes/api-result';
import { Router } from '@angular/router';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit {

  roles = [];
  page = {
    order: '',
    direction: '',
    items: 10,
    offset: 0
  };

  constructor(
    private title: Title,
    private security: SecurityService,
    private router: Router
  ) { }

  ngOnInit() {
    this.title.setTitle('Roles');
    this.security.get_roles(this.page.order, this.page.direction, this.page.items, this.page.offset).subscribe((r: ApiResult) => {
      if (r.status) {
        if (r.data && r.data.roles) {
          this.roles = r.data.roles;
        } else {
          console.log(r);
        }
      } else {
        console.error(r);
      }
    });
  }

  new() {
    this.router.navigate(['admin', 'security', 'roles', 'new']);
  }

}
