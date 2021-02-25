import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { TodoService } from '../../services/to-do.service';
import { ToDo } from '../../models/todo';
@Component({
  selector: 'app-to-do-list',
  templateUrl: './to-do-list.component.html',
  styleUrls: ['./to-do-list.component.scss']
})
export class ToDoListComponent implements OnInit {

  todos: ToDo[] = [];
  todo: ToDo;
  // isInputEmpty: boolean;
  form = new FormGroup({
    todoInput: new FormControl('')
  });

  constructor(private todoService: TodoService) { }

  ngOnInit() {
    this.todoService.getTodos()
    .subscribe((data: ToDo[]) => {
      this.todos = data;
      console.log(this.todos);
    });
  }

  deleteTodo(todo) {
    this.todoService.deleteTodo(todo.id)
    .subscribe(response => {
      const index: number = this.todos.indexOf(todo);
      this.todos.splice(index, 1);
    });
  }

  onSubmit() {
    const newTodo: ToDo = {
      id: null,
      body: this.form.controls.todoInput.value,
      active: true
    };
    this.todoService.createTodo(newTodo)
    .subscribe(response => {
      console.log(response, 'created todos');
      this.todos.push(response);
    });
    this.form.controls.todoInput.setValue('');
  }

  toggleCompletion(todo) {
    this.todoService.completeTodo(todo)
    .subscribe(response => {
      const id = todo.id;
      this.getTodo(id);
      this.todoService.getSingleTodo(id)
      .subscribe(updatedTodo => {
        // this.completedTodo = updatedTodo.active;
        const index: number = this.todos.indexOf(updatedTodo);
        if (index !== -1) {
          this.todos[index] = updatedTodo;
        }
        this.todos.slice(0);
      });
    });
  }

  getTodo(id: number) {
    this.todoService.getSingleTodo(id)
    .subscribe(updatedTodo => {
      const index: number = this.todos.indexOf(updatedTodo);
      if (index !== -1) {
        this.todos[index] = updatedTodo;
    }
    });
  }

  deleteAll() {
    this.todoService.deleteAllTodos(this.todos)
    .subscribe(res => {
      this.todos = [];
    });
  }

}
