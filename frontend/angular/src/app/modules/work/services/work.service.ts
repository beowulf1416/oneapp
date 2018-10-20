import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiResult } from '../../../classes/api-result';
import { Task } from '../classes/task';

@Injectable({
  providedIn: 'root'
})
export class WorkService {

  constructor() { }

  get_tasks(): Array<Task> {
    return [
      new Task(
        'task 1',
        'task description 1',
        new Date('10/1/2018'),
        new Date('10/31/2018'),
        new Date('10/1/2018'),
        new Date('10/31/2018'),
        null,
        null),
      new Task(
        'task 2',
        'task description 1',
        new Date('10/2/2018'),
        new Date('10/31/2018'),
        new Date('10/2/2018'),
        new Date('10/31/2018'),
        null,
        null)
    ];
  }
}
