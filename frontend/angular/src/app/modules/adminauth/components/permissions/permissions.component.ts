import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { SecurityService } from '../../services/security.service';
import { ApiResult } from '../../../../classes/api-result';
import { Router } from '@angular/router';

@Component({
  selector: 'app-permissions',
  templateUrl: './permissions.component.html',
  styleUrls: ['./permissions.component.css']
})
export class PermissionsComponent implements OnInit {

  permissions = [];
  page = {
    items: 10,
    offset: 0
  };

  constructor(
    private title: Title,
    private security: SecurityService,
    private router: Router
  ) { }

  ngOnInit() {
    this.title.setTitle('Permissions');
    this.security.get_permissions(this.page.items, this.page.offset).subscribe((r: ApiResult) => {
      if (r.status) {
        if (r.data && r.data.permissions) {
          this.permissions = r.data.permissions;
        } else {
          console.log(r);
        }
      } else {
        console.error(r);
      }
    });
  }

  new() {
    this.router.navigate(['admin', 'permissions', 'new']);
  }
}
