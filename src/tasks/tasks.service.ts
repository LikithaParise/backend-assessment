import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './entities/task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
  ) {}

  async create(createTaskDto: CreateTaskDto, userId: string): Promise<Task> {
    try {
      const task = this.tasksRepository.create({
        ...createTaskDto,
        userId,
      });

      return await this.tasksRepository.save(task);
    } catch (error) {
      throw new InternalServerErrorException('Failed to create task');
    }
  }

  async findAll(userId: string): Promise<Task[]> {
    try {
      return await this.tasksRepository.find({
        where: { userId },
        order: { createdAt: 'DESC' },
      });
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch tasks');
    }
  }

  async findOne(id: string, userId: string): Promise<Task> {
    try {
      const task = await this.tasksRepository.findOne({
        where: { id, userId },
      });

      if (!task) {
        throw new NotFoundException(`Task with ID ${id} not found`);
      }

      return task;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to fetch task');
    }
  }

  async update(id: string, updateTaskDto: UpdateTaskDto, userId: string): Promise<Task> {
    try {
      const task = await this.tasksRepository.findOne({
        where: { id },
      });

      if (!task) {
        throw new NotFoundException(`Task with ID ${id} not found`);
      }

      // Check if the user owns this task
      if (task.userId !== userId) {
        throw new ForbiddenException('You do not have permission to update this task');
      }

      Object.assign(task, updateTaskDto);
      return await this.tasksRepository.save(task);
    } catch (error) {
      if (error instanceof NotFoundException || error instanceof ForbiddenException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to update task');
    }
  }

  async remove(id: string, userId: string): Promise<void> {
    try {
      const task = await this.tasksRepository.findOne({
        where: { id },
      });

      if (!task) {
        throw new NotFoundException(`Task with ID ${id} not found`);
      }

      // Check if the user owns this task
      if (task.userId !== userId) {
        throw new ForbiddenException('You do not have permission to delete this task');
      }

      await this.tasksRepository.remove(task);
    } catch (error) {
      if (error instanceof NotFoundException || error instanceof ForbiddenException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to delete task');
    }
  }
}
