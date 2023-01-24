import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../interfaces/login-form.interface';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  authenticate(username: string, password: string): Observable<User> {
    return this.http.post<User>(this.apiUrl + '/login', { username, password });
  }
}
