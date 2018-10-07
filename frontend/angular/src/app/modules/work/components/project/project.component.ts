import { Component, OnInit } from '@angular/core';

import { Task } from '../../classes/task';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  task: Array<Task> = new Array<Task>();

  constructor() { }

  ngOnInit() {
  }

}
