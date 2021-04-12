import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home.component';
import { TodosListComponent } from '@app/todos/components/todos-list/todos-list.component';
import { FormComponent } from '@app/shared/form/form.component';
import { HeaderComponent } from '@app/shared/header/header.component';

@NgModule({
  declarations: [
    HomeComponent,
    TodosListComponent,
    FormComponent,
    HeaderComponent,
  ],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [HomeComponent, TodosListComponent, FormComponent, HeaderComponent],
})
export class HomeModule {}
