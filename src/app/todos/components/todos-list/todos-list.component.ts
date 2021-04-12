import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Select, Store } from '@ngxs/store';
import { TodosState } from '@store/todos.state';
import { DeleteTodo, GetTodos, SetSelectedTodo, UpdateTodo } from '@store/todos.actions';
import { Todo } from '@serverAPI/todos/interfaces/todo.interface';
import { UtilsService } from '@app/todos/services/utils.service';

@Component({
  selector: 'app-todos-list',
  templateUrl: './todos-list.component.html',
  styleUrls: ['./todos-list.component.scss'],
})
export class TodosListComponent implements OnInit {
  @Select(TodosState.getTodoList) todos$: Observable<Todo[]>;

  constructor(private store: Store, private utilsService:UtilsService) {}

  ngOnInit(): void {
    this.store.dispatch(new GetTodos());
  }

  onEdit(todo: Todo): void {
    this.store.dispatch(new SetSelectedTodo(todo));
    this.utilsService.showForm(true);
  }

  onDelete(id: string): void {
    const confirmation = confirm('Are you sure?');

    if (confirmation) {
      this.store.dispatch(new DeleteTodo(id));
    }
  }

  onCompleted(todo: Todo): void {
    todo = {
      ...todo,
      completed: true,
    };

    this.store.dispatch(new UpdateTodo(todo._id, todo));
  }

  trackByFunction({item}){
    if(!item) return null;

    return item._id;
  }
}
