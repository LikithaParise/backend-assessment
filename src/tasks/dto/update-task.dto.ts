import { IsString, IsEnum, IsOptional, MinLength, MaxLength } from 'class-validator';
import { TaskStatus } from '../entities/task.entity';

export class UpdateTaskDto {
  @IsOptional()
  @IsString()
  @MinLength(3, { message: 'Title must be at least 3 characters long' })
  @MaxLength(100, { message: 'Title must not exceed 100 characters' })
  title?: string;

  @IsOptional()
  @IsString()
  @MinLength(10, { message: 'Description must be at least 10 characters long' })
  description?: string;

  @IsOptional()
  @IsEnum(TaskStatus, { message: 'Status must be TODO, IN_PROGRESS, or DONE' })
  status?: TaskStatus;
}
