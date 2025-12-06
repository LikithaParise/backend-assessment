import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException, ForbiddenException } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './entities/task.entity';

describe('TasksService', () => {
  let service: TasksService;
  let repository: Repository<Task>;

  const mockRepository = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    remove: jest.fn(),
  };

  const userId = '123e4567-e89b-12d3-a456-426614174000';
  const differentUserId = '987e6543-e89b-12d3-a456-426614174999';

  const mockTask = {
    id: 'task-123',
    title: 'Test Task',
    description: 'Test Description for the task',
    status: TaskStatus.TODO,
    userId: userId,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TasksService,
        {
          provide: getRepositoryToken(Task),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<TasksService>(TasksService);
    repository = module.get<Repository<Task>>(getRepositoryToken(Task));

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should successfully create a new task', async () => {
      const createTaskDto = {
        title: 'Test Task',
        description: 'Test Description for the task',
        status: TaskStatus.TODO,
      };

      mockRepository.create.mockReturnValue(mockTask);
      mockRepository.save.mockResolvedValue(mockTask);

      const result = await service.create(createTaskDto, userId);

      expect(result).toEqual(mockTask);
      expect(mockRepository.create).toHaveBeenCalledWith({
        ...createTaskDto,
        userId,
      });
      expect(mockRepository.save).toHaveBeenCalled();
    });
  });

  describe('findAll', () => {
    it('should return an array of tasks for a user', async () => {
      const tasks = [mockTask, { ...mockTask, id: 'task-2' }];
      mockRepository.find.mockResolvedValue(tasks);

      const result = await service.findAll(userId);

      expect(result).toEqual(tasks);
      expect(mockRepository.find).toHaveBeenCalledWith({
        where: { userId },
        order: { createdAt: 'DESC' },
      });
    });
  });

  describe('findOne', () => {
    it('should return a task by id for the owner', async () => {
      mockRepository.findOne.mockResolvedValue(mockTask);

      const result = await service.findOne(mockTask.id, userId);

      expect(result).toEqual(mockTask);
      expect(mockRepository.findOne).toHaveBeenCalledWith({
        where: { id: mockTask.id, userId },
      });
    });

    it('should throw NotFoundException if task not found', async () => {
      mockRepository.findOne.mockResolvedValue(null);

      await expect(
        service.findOne('non-existent-id', userId),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update a task successfully', async () => {
      const updateTaskDto = {
        title: 'Updated Task',
        status: TaskStatus.IN_PROGRESS,
      };
      const updatedTask = { ...mockTask, ...updateTaskDto };

      mockRepository.findOne.mockResolvedValue(mockTask);
      mockRepository.save.mockResolvedValue(updatedTask);

      const result = await service.update(mockTask.id, updateTaskDto, userId);

      expect(result.title).toEqual(updateTaskDto.title);
      expect(result.status).toEqual(updateTaskDto.status);
      expect(mockRepository.save).toHaveBeenCalled();
    });

    it('should throw NotFoundException if task not found', async () => {
      mockRepository.findOne.mockResolvedValue(null);

      await expect(
        service.update('non-existent-id', { title: 'Test' }, userId),
      ).rejects.toThrow(NotFoundException);
    });

    it('should throw ForbiddenException if user does not own the task', async () => {
      mockRepository.findOne.mockResolvedValue(mockTask);

      await expect(
        service.update(mockTask.id, { title: 'Test' }, differentUserId),
      ).rejects.toThrow(ForbiddenException);
    });
  });

  describe('remove', () => {
    it('should remove a task successfully', async () => {
      mockRepository.findOne.mockResolvedValue(mockTask);
      mockRepository.remove.mockResolvedValue(mockTask);

      await service.remove(mockTask.id, userId);

      expect(mockRepository.remove).toHaveBeenCalledWith(mockTask);
    });

    it('should throw NotFoundException if task not found', async () => {
      mockRepository.findOne.mockResolvedValue(null);

      await expect(service.remove('non-existent-id', userId)).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should throw ForbiddenException if user does not own the task', async () => {
      mockRepository.findOne.mockResolvedValue(mockTask);

      await expect(
        service.remove(mockTask.id, differentUserId),
      ).rejects.toThrow(ForbiddenException);
    });
  });
});
