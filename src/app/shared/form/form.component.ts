import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Select, Store } from '@ngxs/store';
import { AddTodo, UpdateTodo } from '@store/todos.actions';
import { TodosState } from '@store/todos.state';
import { UtilsService } from '@app/todos/services/utils.service';
import { Todo } from '@serverAPI/todos/interfaces/todo.interface';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  @Select(TodosState.getSelectedTodo) selectedTodo$: Observable<Todo>;

  public formTodo: FormGroup;
  public editTodo: boolean = false;

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private utilsService: UtilsService
  ) {
    this.createForm();
  }

  ngOnInit(): void {
    this.selectedTodo$.subscribe((todo) => {
      if (todo) {
        this.refillForm(todo);
        this.editTodo = true;
      } else {
        this.editTodo = false;
      }
    });
  }

  private createForm() {
    this.formTodo = this.fb.group({
      _id: [''],
      name: ['', Validators.required],
      completed: [false],
    });
  }

  private resetForm(): void {
    this.formTodo.reset();
    this.editTodo = false;
  }

  private refillForm(todo: Todo): void {
    this.formTodo.patchValue({
      _id: todo._id,
      name: todo.name,
      completed: todo.completed,
    });
  }

  onSave(todo: Todo): void {
    if (this.editTodo) {
      //edit
      this.store.dispatch(new UpdateTodo(todo._id, todo));
    } else {
      //new
      delete todo._id;
      this.store.dispatch(new AddTodo(todo));
    }
    
    this.resetForm();
    this.utilsService.showForm(false);
  }
}
