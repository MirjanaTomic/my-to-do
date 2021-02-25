import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ToDo } from '../../models/todo';
import { FormGroup, FormControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
export interface PeriodicElement {
  task: string;
  position: number;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, task: 'Hydrogen'},
  {position: 2, task: 'Helium'},
  {position: 3, task: 'Lithium'}
];

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

  displayedColumns: string[] = ['select', 'task', 'action'];
  dataSource = ELEMENT_DATA;
  // dataSource: MatTableDataSource<ToDo>;

  completedTodoForm = new FormGroup({
    completeCheckbox: new FormControl('')
  });

  constructor() { }

  ngOnInit() {
    // console.log(this.dataSource);
    // this.dataSource = this.todo;
  }

  delete(todo: ToDo) {
    console.log(todo);
    this.todoDeleted.emit(todo);
  }

  complete(todo) {
    this.toggleComplete.emit(todo);
  }
}
