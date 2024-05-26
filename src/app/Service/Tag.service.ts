import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {List} from "../Interfaces/List";
import {Tag} from "../Interfaces/Tag";

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

  getAllTag(idUser: number): Observable<Tag[]> {
    return this.http.get<Tag[]>(`${this.apiUrl}/getAllTag/${idUser}`)
  }

  addTag(username: string, name: string): Observable<Tag> {
    return this.http.post<Tag>(`${this.apiUrl}/addTag/${username}/${name}`, {})
  }

  addTagByIdUser(name: string, idUser: number): Observable<Tag> {
    return this.http.post<Tag>(`${this.apiUrl}/addTagByIdUser/${name}/${idUser}`, {})
  }

  deleteTag(idUser: number, name: string){
    return this.http.delete(`${this.apiUrl}/deleteTag/${idUser}/${name}`)
  }
}
