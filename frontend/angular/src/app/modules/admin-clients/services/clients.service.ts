import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ApiResult } from '../../../classes/api-result';
import { ModuleURLS } from '../classes/module-urls';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  constructor(
    private http: HttpClient
  ) { }

  get_clients(): Observable<ApiResult> {
    return this.http.post<ApiResult>(ModuleURLS.api_get_clients, JSON.stringify({}));
  }

  update_client(client_id: string, name: string, description: string): Observable<ApiResult> {
    return this.http.post<ApiResult>(ModuleURLS.api_update_client, JSON.stringify({
      client_id: client_id,
      name: name,
      description: description
    }));
  }

  create_client(client_id: string, name: string, description: string): Observable<ApiResult> {
    return this.http.post<ApiResult>(ModuleURLS.api_create_client, JSON.stringify({
      client_id: client_id,
      name: name,
      description: description
    }));
  }
}
