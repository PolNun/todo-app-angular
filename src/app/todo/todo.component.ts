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
      this.todoService.addTodo(titleInput.value)
    } else {
      titleInput.classList.add('border-danger');
      setTimeout(() => {
        titleInput.classList.remove('border-danger');
      }, 2000);
    }
    titleInput.value = '';
  }

  checkCompleted(index: number, newStatus: boolean) {
    this.todoService.updateTodoStatus(index, newStatus);
  }

  deleteTodo(index: number) {
    this.todoService.deleteTodoByIndex(index);
  }
}
