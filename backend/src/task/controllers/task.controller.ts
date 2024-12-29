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
  Req,
} from '@nestjs/common';
import { TaskService } from '../services/task.service';
import { CreateTaskDto } from '../dto/createTask.dto';
import { UpdateTaskDto } from '../dto/updateTask.dto';
import { TaskDocument } from '../schemas/task.schema';
import { ApiBearerAuth, ApiTags, ApiQuery } from '@nestjs/swagger';
import { AuthGuard } from '../../auth/guards/auth.guard';
import { TaskStatus } from '../enums/taskStatus.enum';
import { JwtPayload } from '../../auth/interfaces/jwtPayload.interface';

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
    @Req() req: { user: JwtPayload },
  ): Promise<TaskDocument> {
    return this.taskService.createTask({
      ...createTaskDto,
      userId: req.user.userId,
    });
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
    @Req() req: { user: JwtPayload },
    @Query('status') status?: TaskStatus,
  ): Promise<TaskDocument[]> {
    return this.taskService.getTasks(req.user.userId, status);
  }

  @ApiBearerAuth()
  @HttpCode(200)
  @Get('user/:userId')
  @UseGuards(AuthGuard)
  async getTasksByUserId(
    @Param('userId') userId: string,
  ): Promise<TaskDocument[]> {
    return this.taskService.getTasksByUserId(userId);
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
