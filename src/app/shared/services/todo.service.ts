import {Injectable} from '@angular/core';
import {Todo} from "../interfaces/todo.interface";

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  todos: Todo[] = [];

  addTodo(title: string) {
    if (title.length > 0) {
      this.todos.unshift({
        title,
        completed: false,
        date: new Date()
      });
      localStorage.setItem('todos', JSON.stringify(this.todos));
    }
  }

  getTodosFromLocalStorage(): Todo[] {
    const todos = JSON.parse(localStorage.getItem('todos')!);
    if (todos) this.todos = todos;
    return this.todos;
  }

  updateTodoStatus(index: number, status: boolean) {
    this.todos[index].completed = status;
    localStorage.setItem('todos', JSON.stringify(this.todos));
  }

  deleteTodoByIndex(index: number) {
    this.todos.splice(index, 1);
    localStorage.setItem('todos', JSON.stringify(this.todos));

    if (this.todos.length === 0) {
      localStorage.removeItem('todos');
    }
  }
}
