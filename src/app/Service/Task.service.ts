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

  // Create a new task
  createTask(taskData: any): Observable<Task> {
    return this.http.post<Task>(`${this.apiUrl}/createTask`, taskData);
  }

  // Mark a task as completed
  markTask(idTask: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/markTask/${idTask}`, {});
  }

  // Mark a task as not completed
  unmarkTask(idTask: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/demarkTask/${idTask}`, {});
  }

  // Check if a task is completed
  isCompletedTask(idTask: number): Observable<{ isComplete: boolean }> {
    return this.http.get<{ isComplete: boolean }>(`${this.apiUrl}/isCompletedTask/${idTask}`);
  }

  // Delete a task
  deleteTask(idTask: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/deleteTask/${idTask}`);
  }

  // Update a task
  updateTask(idTask: number, taskData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/updateTask/${idTask}`, taskData);
  }

  // Get all completed tasks for a user
  getAllCompleteTask(idUser: number, idList: number): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.apiUrl}/getAllCompleteTask/${idUser}/${idList}`);
  }

  // Get all non-completed tasks for a user
  getAllNoCompleteTask(idUser: number, idList: number): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.apiUrl}/getAllNoCompleteTask/${idUser}/${idList}`);
  }

  // Get a task by ID
  getTaskById(idTask: number): Observable<Task> {
    return this.http.get<Task>(`${this.apiUrl}/getTaskById/${idTask}`);
  }
}
