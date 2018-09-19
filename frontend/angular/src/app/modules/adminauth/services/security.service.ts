import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ApiResult } from '../../../classes/api-result';
import { URLS } from '../classes/urls';

@Injectable({
  providedIn: 'root'
})
export class SecurityService {

  constructor(
    private http: HttpClient
  ) { }

  // permissions
  get_permissions(items: number, offset: number): Observable<ApiResult> {
    return this.http.post<ApiResult>(URLS.api_admin_security_permissions, JSON.stringify({
      page: {
        items: items,
        offset: offset
      }
    }));
  }

  get_permission(id: string): Observable<ApiResult> {
    return this.http.post<ApiResult>(URLS.api_admin_security_permissions_get, JSON.stringify({
      id: id
    }));
  }

  create_permission(name: string, description: string): Observable<ApiResult> {
    return this.http.post<ApiResult>(URLS.api_admin_security_permissions_create, JSON.stringify({
      name: name,
      description: description
    }));
  }

  // roles
  get_roles(items: number, offset: number): Observable<ApiResult> {
    return this.http.post<ApiResult>(URLS.api_admin_security_roles, JSON.stringify({
      page: {
        items: items,
        offset: offset
      }
    }));
  }

  get_role(id: string): Observable<ApiResult> {
    return this.http.post<ApiResult>(URLS.api_admin_security_roles_get, JSON.stringify({
      id: id
    }));
  }

  create_role(name: string, description: string): Observable<ApiResult> {
    return this.http.post<ApiResult>(URLS.api_admin_security_roles_create, JSON.stringify({
      name: name,
      description: description
    }));
  }
}
