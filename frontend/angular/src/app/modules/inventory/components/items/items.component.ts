import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { InventoryService } from '../../services/inventory.service';
import { ApiResult } from 'src/app/classes/api-result';


@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {

  @ViewChild('app-data-table') datatable;
  items = [];

  constructor(
    private title: Title,
    private service: InventoryService
  ) { }

  ngOnInit() {
    this.get_items();
  }

  get_items() {
    this.service.get_items(
      {
        rows: 10,
        offset: 0
      },
      {}
    ).subscribe((r: ApiResult) => {
      if (r.status) {
        this.items = r.data.items;
        // this.datatable.rows = this.items;
      } else {
        console.error(r);
      }
    });
  }

  new() {
    console.log('new');
  }

  sort() {
    console.log('sort');
  }

  filter() {
    console.log('filter');
  }
}
