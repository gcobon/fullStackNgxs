import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Todo } from '@serverAPI/todos/interfaces/todo.interface';
import { CreateTodoDto } from '@serverAPI/todos/dto/create-todo';
import { TodosService } from '@serverAPI/todos/todos.service';

@Controller('todos')
export class TodosController {
  constructor(private todoService: TodosService) {}

  @Get()
  async all(): Promise<Todo[]> {
    return this.todoService.all();
  }
  @Post()
  async add(@Body() todo: CreateTodoDto): Promise<Todo> {
    return this.todoService.add(todo);
  }

  @Put('/:id')
  async update(
    @Param('id') id: string,
    @Body() todo: CreateTodoDto
  ): Promise<Todo> {
    return this.todoService.update(id, todo);
  }

  @Delete('/:id')
  async delete(@Param('id') id: string): Promise<Todo> {
    return this.todoService.delete(id);
  }
}
