import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ApiResult } from '../../../classes/api-result';
import { ModuleURLS } from '../classes/module-urls';

@Injectable({
  providedIn: 'root'
})
export class SecurityService {

  constructor(
    private http: HttpClient
  ) { }

  // permissions
  get_permissions(order: string, direction: string, items: number, offset: number): Observable<ApiResult> {
    return this.http.post<ApiResult>(ModuleURLS.api_admin_security_permissions, JSON.stringify({
      page: {
        order: order,
        direction: direction,
        items: items,
        offset: offset
      }
    }));
  }

  get_permission(id: string): Observable<ApiResult> {
    return this.http.post<ApiResult>(ModuleURLS.api_admin_security_permissions_get, JSON.stringify({
      id: id
    }));
  }

  create_permission(name: string, description: string): Observable<ApiResult> {
    return this.http.post<ApiResult>(ModuleURLS.api_admin_security_permissions_create, JSON.stringify({
      name: name,
      description: description
    }));
  }

  // roles
  get_roles(order: string, direction: string, items: number, offset: number): Observable<ApiResult> {
    return this.http.post<ApiResult>(ModuleURLS.api_admin_security_roles, JSON.stringify({
      page: {
        order: order,
        direction: direction,
        items: items,
        offset: offset
      }
    }));
  }

  get_role(id: string): Observable<ApiResult> {
    return this.http.post<ApiResult>(ModuleURLS.api_admin_security_roles_get, JSON.stringify({
      id: id
    }));
  }

  create_role(name: string, description: string): Observable<ApiResult> {
    return this.http.post<ApiResult>(ModuleURLS.api_admin_security_roles_create, JSON.stringify({
      name: name,
      description: description
    }));
  }

  // users
  get_users(order: string, direction: string, items: number, offset: number): Observable<ApiResult> {
    return this.http.post<ApiResult>(ModuleURLS.api_admin_security_users, JSON.stringify({
      page: {
        order: order,
        direction: direction,
        items: items,
        offset: offset
      }
    }));
  }

  get_user(id: string): Observable<ApiResult> {
    return this.http.post<ApiResult>(ModuleURLS.api_admin_security_users_get, JSON.stringify({
      id: id
    }));
  }

  create_user(email: string, clients: any): Observable<ApiResult> {
    return this.http.post<ApiResult>(ModuleURLS.api_admin_security_users_create, JSON.stringify({
      email: email,
      clients: clients
    }));
  }
}
