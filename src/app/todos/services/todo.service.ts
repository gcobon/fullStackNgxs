import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Todo } from '@serverAPI/todos/interfaces/todo.interface';

const base_url:string = "http://localhost:4200/api/todos";

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private http:HttpClient) { }


  getAll():Observable<Todo[]>{
    return this.http.get<Todo[]>(base_url);
  }

  addTodo(todo:Todo):Observable<Todo>{
    return this.http.post<Todo>(base_url, todo);
  }

  updateTodo(id:string, todo:Todo):Observable<Todo>{
    return this.http.put<Todo>(`${base_url}/${id}`, todo);
  }

  deleteTodo(id:string):Observable<Todo>{
    return this.http.delete<Todo>(`${base_url}/${id}`);
  }
}
