import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { User, LoginAPIResponse } from '../interfaces/login-form.interface';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiUrl = environment.apiUrl;
  private _isLoggedIn = false;
  private _username = '';
  private _logoutSubject = new Subject<void>();
  private _authCode = '';

  constructor(private http: HttpClient) {}

  get isLoggedIn() {
    return this._isLoggedIn;
  }

  get username() {
    return this._username;
  }

  get logoutSubject() {
    return this._logoutSubject.asObservable();
  }

  get authCode() {
    return this._authCode;
  }

  login(username: string, password: string) {
    this._isLoggedIn = true;
    this._username = username;
    this._authCode = btoa(`${username}:${password}`);
  }

  logout() {
    this._isLoggedIn = false;
    this._username = '';
    this._authCode = '';
  }

  authenticate(username: string, password: string): Observable<LoginAPIResponse> {
    return this.http.post<LoginAPIResponse>(this.apiUrl + 'admin/login', { username, password });
  }

  register(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/register`, user);
  }
}
