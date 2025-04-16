import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Todo } from 'src/entities/todo.entity';
import { Repository } from 'typeorm';
import { CreateTodoDto, UpdateTodoDto } from './todo.dto';


@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private todoRepository: Repository<Todo>,
  ) {}
  //các phương thức CRUD

  //Lấy tất cả nhiệm vụ
  async findAll(): Promise<Todo[]> {
    return this.todoRepository.find();
  }
  //Lấy nhiệm vụ theo id
  async findOne(id: string): Promise<Todo> {
    const todo = await this.todoRepository.findOneBy({ id: parseInt(id) });
    if (!todo) {
      throw new NotFoundException(`Todo with id ${id} not found`);
    }
    return todo;
  }
  //Thêm nhiệm vụ mới
  async create(createTodoDto: CreateTodoDto): Promise<Todo> {
      const todo = new Todo();
      Object.assign(todo, createTodoDto);
      todo.createdAt = new Date();
      todo.updatedAt = new Date();
      return this.todoRepository.save(todo);
    }
  //cập nhật thông tin nhiệm vụ
  async update(id: string, updateTodoDto: UpdateTodoDto): Promise<Todo> {
    const existingTodo = await this.todoRepository.findOneBy({
      id: parseInt(id),
    });
    if (!existingTodo) {
      throw new NotFoundException(`Todo with id ${id} not found`);
    }
    Object.assign(existingTodo, updateTodoDto);
    existingTodo.updatedAt = new Date();
    return this.todoRepository.save(existingTodo);
  }
  //xóa nhiệm vụ theo id
  async delete(id: string): Promise<void> {
    const todo = await this.todoRepository.findOneBy({ id: parseInt(id) });
    if (!todo) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    await this.todoRepository.remove(todo);
  }
}
