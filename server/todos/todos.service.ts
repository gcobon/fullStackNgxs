import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTodoDto } from '@serverAPI/todos/dto/create-todo';
import { Todo } from '@serverAPI/todos/interfaces/todo.interface';

@Injectable()
export class TodosService {
  constructor(@InjectModel('Todo') private readonly todoModel: Model<any>) {}

  async all(): Promise<Todo[]> {
    return await this.todoModel.find();
  }

  async add(todo: CreateTodoDto): Promise<Todo> {
    return await this.todoModel.create(todo);
  }

  async update(id: string, todo: CreateTodoDto): Promise<Todo> {
    return await this.todoModel.findByIdAndUpdate(id, todo, { new: true });
  }

  async delete(id: string): Promise<Todo> {
    return await this.todoModel.findByIdAndRemove(id);
  }
}
