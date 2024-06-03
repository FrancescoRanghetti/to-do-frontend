import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../Interfaces/Task'; // Assume that you have a Task model defined

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(protected http: HttpClient) {}

  createTask(taskData: any): Observable<Task> {
    return this.http.post<Task>(`${this.apiUrl}/createTask`, taskData);
  }

  markTask(idTask: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/markTask/${idTask}`, {});
  }

  unmarkTask(idTask: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/demarkTask/${idTask}`, {});
  }

  isCompletedTask(idTask: number): Observable<{ isComplete: boolean }> {
    return this.http.get<{ isComplete: boolean }>(`${this.apiUrl}/isCompletedTask/${idTask}`);
  }

  deleteTask(idTask: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/deleteTask/${idTask}`);
  }

  updateTask(idTask: number, taskData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/updateTask/${idTask}`, taskData);
  }

  getAllCompleteTask(idUser: number, idList: number): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.apiUrl}/getAllCompleteTask/${idUser}/${idList}`);
  }

  getAllNoCompleteTask(idUser: number, idList: number): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.apiUrl}/getAllNoCompleteTask/${idUser}/${idList}`);
  }

  getTaskById(idTask: number): Observable<Task> {
    return this.http.get<Task>(`${this.apiUrl}/getTaskById/${idTask}`);
  }
}
