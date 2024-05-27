import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {List} from "../Interfaces/List";
import {Task} from "../Interfaces/Task";

@Injectable({
  providedIn: 'root'
})
export class ListService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(protected http: HttpClient) {
  }

  createDefaultList(idUser: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/createDefaultList/${idUser}`, {});
  }

  getAllList(idUser: number): Observable<List[]> {
    return this.http.get<List[]>(`${this.apiUrl}/getAllList/${idUser}`)
  }

  addList(name: string, idUser: number): Observable<List> {
    return this.http.post<List>(`${this.apiUrl}/addList/${name}/${idUser}`, {})
  }

  deleteList(name: string, idUser: number) {
    return this.http.delete(`${this.apiUrl}/deleteList/${name}/${idUser}`)
  }

  getIdListByName(name: string, idUser: number) : Observable<List> {
    return this.http.get<List>(`${this.apiUrl}/getIdListByName/${name}/${idUser}`)
  }
}
