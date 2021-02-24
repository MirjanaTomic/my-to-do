import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToDo } from '../models/todo';
import { Observable, from } from 'rxjs';
import { concatMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  url = 'http://localhost:3000/todos';

  constructor(private http: HttpClient) { }

  getTodos(): Observable<ToDo[]> {
    return this.http.get<ToDo[]>(this.url);
  }

  getSingleTodo(id): Observable<ToDo> {
    return this.http.get<ToDo>(this.url + '/' + id);
  }

  deleteTodo(id: number) {
    return this.http.delete(this.url + '/' + id);
  }

  createTodo(newTodo: ToDo) {
    console.log(newTodo);
    return this.http.post<ToDo>(this.url, newTodo);
  }

  completeTodo(todo: ToDo) {
    const id = todo.id;
    const active = !todo.active;
    return this.http.patch(this.url + '/' + id, {active: active});
  }

  deleteAllTodos(todos): Observable<ToDo[]> {
    const ids = [];
    todos.forEach(item => ids.push(item.id));
    const delete$ = from(ids);
    return delete$.pipe(concatMap(id => this.http.delete<ToDo[]>(this.url + '/' + id)));
  }
}

