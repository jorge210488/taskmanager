import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  Post,
  Query,
  HttpCode,
  UseGuards,
} from '@nestjs/common';
import { TaskService } from '../services/task.service';
import { CreateTaskDto } from '../dto/createTask.dto';
import { UpdateTaskDto } from '../dto/updateTask.dto';
import { TaskDocument } from '../schemas/task.schema';
import { ApiBearerAuth, ApiTags, ApiQuery } from '@nestjs/swagger';
import { AuthGuard } from '../../auth/guards/auth.guard';
import { TaskStatus } from '../enums/taskStatus.enum';

@ApiTags('tasks')
@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @ApiBearerAuth()
  @HttpCode(201)
  @Post()
  @UseGuards(AuthGuard)
  async createTask(
    @Body() createTaskDto: CreateTaskDto,
  ): Promise<TaskDocument> {
    return this.taskService.createTask(createTaskDto);
  }

  @ApiBearerAuth()
  @HttpCode(200)
  @Get()
  @UseGuards(AuthGuard)
  @ApiQuery({
    name: 'status',
    required: false,
    enum: TaskStatus,
    description: 'Filtrar las tareas por estado: "completed" o "pending"',
  })
  async getTasks(
    @Query('status') status?: TaskStatus,
  ): Promise<TaskDocument[]> {
    return this.taskService.getTasks(status);
  }

  @ApiBearerAuth()
  @HttpCode(200)
  @Get(':id')
  @UseGuards(AuthGuard)
  async getTaskById(@Param('id') id: string): Promise<TaskDocument> {
    return this.taskService.getTaskById(id);
  }

  @ApiBearerAuth()
  @HttpCode(200)
  @Put(':id')
  @UseGuards(AuthGuard)
  async updateTask(
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ): Promise<TaskDocument> {
    return this.taskService.updateTask(id, updateTaskDto);
  }

  @ApiBearerAuth()
  @HttpCode(204)
  @Delete(':id')
  @UseGuards(AuthGuard)
  async deleteTask(@Param('id') id: string): Promise<void> {
    return this.taskService.deleteTask(id);
  }
}
