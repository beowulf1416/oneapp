import { Component, OnInit, inject, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

import { Task } from '../../classes/task';
import { WorkService } from '../../services/work.service';
import { fromEvent } from 'rxjs';
import { skipUntil, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  tasks: Array<Task> = new Array<Task>();

  constructor(
    private work: WorkService,
    @Inject(DOCUMENT) private document: Document
  ) { }

  ngOnInit() {
    this.tasks = this.work.get_tasks();
  }

  mousedown_colresize(event) {
    console.log('ProjectComponent::mousedown_colresize');
    console.log(event);

    const parent = (<Node> event.target).parentElement;
    const width = parent.clientWidth;
    const start_x = event.x;
    console.log('start', start_x);

    const down$ = fromEvent(this.document, 'mousedown');
    const up$ = fromEvent(this.document, 'mouseup');
    const move$ = fromEvent(this.document, 'mousemove');
    const drag$ = move$.pipe(
      skipUntil(down$),
      takeUntil(up$)
    );
    drag$.subscribe((e: MouseEvent) => {
      const new_width = width + (e.x - start_x);
      console.log(new_width);
      parent.style.width = `${new_width}px`;
      console.log(parent.style.width);
    });
  }

  save() {
    console.log('ProjectComponent::save');
  }
}
