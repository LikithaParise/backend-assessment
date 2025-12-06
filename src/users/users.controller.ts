import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ValidationPipe,
  ParseUUIDPipe,
  Request,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll() {
    return {
      message: 'Users retrieved successfully',
      data: await this.usersService.findAll(),
    };
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return {
      message: 'User retrieved successfully',
      data: await this.usersService.findOne(id),
    };
  }

  @Patch(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    updateUserDto: UpdateUserDto,
  ) {
    return {
      message: 'User updated successfully',
      data: await this.usersService.update(id, updateUserDto),
    };
  }

  @Delete(':id')
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    await this.usersService.remove(id);
    return {
      message: 'User deleted successfully',
    };
  }

  @Get('profile/me')
  async getProfile(@Request() req) {
    return {
      message: 'Profile retrieved successfully',
      data: await this.usersService.findOne(req.user.userId),
    };
  }
}
