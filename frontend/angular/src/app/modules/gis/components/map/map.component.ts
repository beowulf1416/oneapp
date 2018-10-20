import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Store, select } from '@ngrx/store';
import { Observable, fromEvent } from 'rxjs';

import { State } from '../../classes/reducers/viewport';
import { Viewport } from '../../classes/viewport';
import { skipUntil, takeUntil, first, takeLast, take, merge, mergeAll } from 'rxjs/operators';
import * as viewportActions from '../../classes/actions/viewport';
import { state } from '@angular/animations';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  @ViewChild('wrapper') wrapper;
  private canvas: HTMLCanvasElement;
  private viewport$: Observable<Viewport>;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private s: Store<State>
  ) {
    this.viewport$ = s.pipe(
      select((state1: any) => state1.gis),
      select((state2: any) => state2.viewport),
      select((state3: State) => state3.viewport)
    );
  }

  ngOnInit() {
    this.canvas = this.document.createElement('canvas');
    const element = this.wrapper.nativeElement;
    this.canvas.width = element.clientWidth;
    this.canvas.height = element.clientHeight;
    this.wrapper.nativeElement.appendChild(this.canvas);

    // this.viewport$.subscribe(r => {
    //   console.log(r);
    // });
  }

  pan() {
    console.log('pan');

    const down$ = fromEvent(this.canvas, 'mousedown');
    const up$ = fromEvent(this.canvas, 'mouseup');
    const move$ = fromEvent(this.canvas, 'mousemove');

    let start: MouseEvent = null;
    let end: MouseEvent = null;

    const drag$ = down$.pipe(merge(up$));
    drag$.subscribe((e: MouseEvent) => {
      // console.log(e);
      switch (e.type) {
        case 'mousedown': {
          start = e;
          break;
        }
        case 'mouseup': {
          end = e;

          const vp = this.viewport$.pipe(
            take(1)
          );
          vp.subscribe((viewport: Viewport) => {
            this.s.dispatch(new viewportActions.Update(
              viewport.move(end.x - start.x, end.y - start.y)
            ));
          });
          break;
        }
      }
    });
  }

}
