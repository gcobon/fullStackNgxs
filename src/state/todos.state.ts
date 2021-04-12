import { Injectable } from '@angular/core';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { tap } from 'rxjs/operators';
import {
  AddTodo,
  DeleteTodo,
  GetTodos,
  SetSelectedTodo,
  UpdateTodo,
} from './todos.actions';

import { TodoService } from '@app/todos/services/todo.service';
import { Todo } from '@serverAPI/todos/interfaces/todo.interface';

export class TodosStateModel {
  public todos: Todo[];
  public selectedTodo: Todo;
}

@State<TodosStateModel>({
  name: 'todos',
  defaults: {
    todos: [],
    selectedTodo: null,
  },
})
@Injectable()
export class TodosState {
  constructor(private todoService: TodoService) {}

  @Selector()
  public static getTodoList({ todos }: TodosStateModel) {
    return todos;
  }

  @Selector()
  public static getSelectedTodo({ selectedTodo }) {
    return selectedTodo;
  }

  @Action(GetTodos)
  getTodos({ getState, setState }: StateContext<TodosStateModel>) {
    return this.todoService.getAll().pipe(
      tap((todos) => {
        const state = getState();
        setState({ ...state, todos });
      })
    );
  }

  @Action(AddTodo)
  addTodo(
    { getState, patchState }: StateContext<TodosStateModel>,
    { payload }: AddTodo
  ) {
   return this.todoService.addTodo(payload).pipe(
      tap((todo) => {
        const state = getState();
        patchState({ todos: [...state.todos, todo] });
      })
    );
  }

  @Action(UpdateTodo)
  updateTodo(
    { getState, setState }: StateContext<TodosStateModel>,
    { id, payload }: UpdateTodo
  ) {
    return this.todoService.updateTodo(id, payload).pipe(
      tap((todo) => {
        const state = getState();
        const newState = state.todos.filter((t) => t._id !== id);

        setState({ ...state, todos: [...newState, todo] });
      })
    );
  }

  @Action(DeleteTodo)
  deleteTodo(
    { getState, patchState }: StateContext<TodosStateModel>,
    { id }: UpdateTodo
  ) {
    return this.todoService.deleteTodo(id).pipe(
      tap(() => {
        const state = getState();
        const newState = state.todos.filter((t) => t._id !== id);

        patchState({ ...state, todos: [...newState] });
      })
    );
  }

  @Action(SetSelectedTodo)
  setSelectedTodo(
    { getState, setState }: StateContext<TodosStateModel>,
    { payload }: UpdateTodo
  ) {
    const state = getState();
    setState({ ...state, selectedTodo: payload });
  }
}
