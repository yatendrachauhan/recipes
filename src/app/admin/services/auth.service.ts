import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { User } from '../interfaces/login-form.interface';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiUrl = environment.apiUrl;
  private _isLoggedIn = false;
  private _username = '';
  private _logoutSubject = new Subject<void>();

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

  login(username: string) {
    this._isLoggedIn = true;
    this._username = username;
  }

  logout() {
    this._isLoggedIn = false;
    this._username = '';
  }

  authenticate(username: string, password: string): Observable<User> {
    return this.http.post<User>(this.apiUrl + '/admin/login', {
      username,
      password,
    });
  }

  register(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/register`, user);
  }
}
