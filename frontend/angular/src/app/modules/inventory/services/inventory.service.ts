import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ApiResult } from 'src/app/classes/api-result';
import { ModuleURLS } from '../classes/module-urls';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  constructor(
    private http: HttpClient
  ) { }

    get_items(pager: any, filter: any): Observable<ApiResult> {
      return this.http.post<ApiResult>(ModuleURLS.api_inventory_items_all, JSON.stringify({
        pager: pager,
        filter: filter
      }));
    }
}
