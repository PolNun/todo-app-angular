import {Component, OnInit} from '@angular/core';
import {TodoService} from "../shared/services/todo.service";
import {Todo} from "../shared/interfaces/todo.interface";

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styles: []
})
export class TodoComponent implements OnInit {

  todos: Todo[] = [];
  pendingTodos: number = 0;
  totalTodos: number = 0;
  finishedTodos: number = 0;
  todosMap = {
    '=0': 'sin tareas.',
    '=1': 'una tarea.',
    'other': '# tareas.'
  };

  constructor(private todoService: TodoService) {
  }

  ngOnInit(): void {
    this.todos = this.todoService.getTodosFromLocalStorage();
  }

  setTitle(titleInput: HTMLInputElement) {
    if (titleInput.value.length <= 30) {
      this.todoService.addTodo(titleInput.value);
      this.totalTodos = this.todoService.totalTodos();
      this.pendingTodos = this.todoService.pendingTodos();
    }
    titleInput.value = '';
  }

  checkCompleted(index: number, newStatus: boolean) {
    this.todoService.updateTodoStatus(index, newStatus);
    this.pendingTodos = this.todoService.pendingTodos();
    this.finishedTodos = this.todoService.finishedTodos();
  }

  deleteTodo(index: number) {
    this.todoService.deleteTodoByIndex(index);
    this.totalTodos = this.todoService.totalTodos();
  }
}
