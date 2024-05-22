import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TagService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(protected http: HttpClient) {
  }

  createDefaultTag(idUser: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/createDefaultTag/${idUser}`, {});
  }
}
