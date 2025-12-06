import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  ValidationPipe,
  ParseUUIDPipe,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('tasks')
@UseGuards(JwtAuthGuard)
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  async create(
    @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    createTaskDto: CreateTaskDto,
    @Request() req,
  ) {
    return {
      message: 'Task created successfully',
      data: await this.tasksService.create(createTaskDto, req.user.userId),
    };
  }

  @Get()
  async findAll(@Request() req) {
    return {
      message: 'Tasks retrieved successfully',
      data: await this.tasksService.findAll(req.user.userId),
    };
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseUUIDPipe) id: string,
    @Request() req,
  ) {
    return {
      message: 'Task retrieved successfully',
      data: await this.tasksService.findOne(id, req.user.userId),
    };
  }

  @Patch(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    updateTaskDto: UpdateTaskDto,
    @Request() req,
  ) {
    return {
      message: 'Task updated successfully',
      data: await this.tasksService.update(id, updateTaskDto, req.user.userId),
    };
  }

  @Delete(':id')
  async remove(
    @Param('id', ParseUUIDPipe) id: string,
    @Request() req,
  ) {
    await this.tasksService.remove(id, req.user.userId);
    return {
      message: 'Task deleted successfully',
    };
  }
}
