import { Component, OnInit, Input } from '@angular/core';

import { DataColumn } from '../../classes/data-column';

export enum Sort {
  None = 0,
  Up = 1,
  Down = -1
}

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})
export class DataTableComponent implements OnInit {

  @Input() columns: Array<DataColumn>;
  @Input() rows: Array<any>;

  config_columns = [];

  constructor() { }

  ngOnInit() {
    this.column_config_fix();
    // console.log(this.columns);
    console.log(this.rows);
  }

  column_config_fix() {
    this.columns.forEach(column => {
      this.config_columns.push({
        name: column.name,
        label: column.label,
        sort: 0,
        filter: ''
      });
    });
  }

  sort(column) {
    console.log('sort', column);
    switch (column.sort) {
      case Sort.Up: {
        column.sort = Sort.Down;
        break;
      }
      case Sort.Down: {
        column.sort = Sort.None;
        break;
      }
      default: {
        column.sort = Sort.Up;
        break;
      }
    }
  }

  filter(column) {
    console.log('filter', column);
  }

}
