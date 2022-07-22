import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private httpClient: HttpClient) {}

  auth(credentials) {
    return this.httpClient.post<{ token: string }>(
      'https://reqres.in/api/login',
      credentials
    );
  }

  getUsersAPI() {
    return this.httpClient.get('https://reqres.in/api/users?page=2');
  }

  getUserAPI(id) {
    return this.httpClient.get(`https://reqres.in/api/users/${id}`);
  }
}
