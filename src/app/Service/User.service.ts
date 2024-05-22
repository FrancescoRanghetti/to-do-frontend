import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(protected http: HttpClient) {
  }

  addUser(name: string, lastName: string, username: string, password: string): Observable<any> {
    const user = {name, lastName, username, password};
    return this.http.post(`${this.apiUrl}/addUser`, user);
  }

  getUser(username: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/getUser/${username}`);
  }

  loginUser(username: string, password: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/loginUser/${username}/${password}`);
  }
}
