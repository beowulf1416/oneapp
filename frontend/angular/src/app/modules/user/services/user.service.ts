import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { ApiResult } from '../../../classes/api-result';
import { URLS } from '../classes/urls';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient
  ) { }

  sign_up(email: string): Observable<ApiResult> {
    return this.http.post<ApiResult>(URLS.api_sign_up, JSON.stringify({
      email: email
    }));
  }

  fetch_email(token: string): Observable<ApiResult> {
    return this.http.post<ApiResult>(URLS.api_email_from_token, JSON.stringify({
      token: token
    }));
  }

  update_verified(token: string, password: string): Observable<ApiResult> {
    return this.http.post<ApiResult>(URLS.api_verify_token, JSON.stringify({
      token: token,
      password: password
    }));
  }
}
