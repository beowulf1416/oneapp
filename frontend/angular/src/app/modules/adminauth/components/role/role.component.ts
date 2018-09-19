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
  }

}
