import { Component, OnInit, Input } from '@angular/core';
import { isListLikeIterable } from '@angular/core/src/change_detection/change_detection_util';

@Component({
  selector: 'app-data-column',
  templateUrl: './data-column.component.html',
  styleUrls: ['./data-column.component.css']
})
export class DataColumnComponent implements OnInit {

  @Input('name') name: string;
  @Input('label') label: string;

  constructor() { }

  ngOnInit() {
  }

}
