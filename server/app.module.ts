import { Module } from '@nestjs/common';
import { AngularUniversalModule } from '@nestjs/ng-universal';
import { join } from 'path';
import { AppServerModule } from '../src/main.server';
import { MongooseModule } from '@nestjs/mongoose';
import { TodosModule } from './todos/todos.module';

@Module({
  imports: [
    AngularUniversalModule.forRoot({
      bootstrap: AppServerModule,
      viewsPath: join(process.cwd(), 'dist/fullStackNgxs/browser'),
    }),
    MongooseModule.forRoot(
      `mongodb+srv://gudy-user:40031412@cluster0.m5oyp.mongodb.net/todos_crud`,
      { useNewUrlParser: true, useUnifiedTopology: true }
    ),
    TodosModule
  ],
})
export class AppModule {}
