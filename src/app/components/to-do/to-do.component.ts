import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ToDo } from '../../models/todo';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-to-do',
  templateUrl: './to-do.component.html',
  styleUrls: ['./to-do.component.scss']
})
export class ToDoComponent implements OnInit {

  @Input() todo: ToDo;

  @Output() todoDeleted: EventEmitter<ToDo> = new EventEmitter();

  @Output() toggleComplete: EventEmitter<ToDo> = new EventEmitter();

  @Input() isCompleted: boolean;

  completedTodoForm = new FormGroup({
    completeCheckbox: new FormControl('')
  });

  constructor() { }

  ngOnInit() {
  }

  delete(todo: ToDo) {
    console.log(todo);
    this.todoDeleted.emit(todo);
  }

  complete(todo) {
    this.toggleComplete.emit(todo);
  }
}
