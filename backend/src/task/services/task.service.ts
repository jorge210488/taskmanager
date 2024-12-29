import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task, TaskDocument } from '../schemas/task.schema';
import { CreateTaskDto } from '../dto/createTask.dto';
import { UpdateTaskDto } from '../dto/updateTask.dto';
import { TaskStatus } from '../enums/taskStatus.enum';

@Injectable()
export class TaskService {
  constructor(
    @InjectModel(Task.name) private readonly taskModel: Model<TaskDocument>,
  ) {}

  async createTask(
    createTaskDto: CreateTaskDto & { userId: string },
  ): Promise<TaskDocument> {
    const newTask = new this.taskModel(createTaskDto);
    return newTask.save();
  }

  async getTasks(userId: string, status?: TaskStatus): Promise<TaskDocument[]> {
    const filter: { userId: string; completed?: boolean } = { userId };
    if (status) {
      filter.completed = status === TaskStatus.COMPLETED;
    }
    return this.taskModel.find(filter).exec();
  }

  async getTasksByUserId(userId: string): Promise<TaskDocument[]> {
    return this.taskModel.find({ userId }).exec();
  }

  async getTaskById(id: string): Promise<TaskDocument> {
    const task = await this.taskModel.findById(id).exec();
    if (!task) {
      throw new NotFoundException('Task not found');
    }
    return task;
  }

  async updateTask(
    id: string,
    updateTaskDto: UpdateTaskDto,
  ): Promise<TaskDocument> {
    const updatedTask = await this.taskModel
      .findByIdAndUpdate(id, updateTaskDto, {
        new: true,
      })
      .exec();
    if (!updatedTask) {
      throw new NotFoundException('Task not found');
    }
    return updatedTask;
  }

  async deleteTask(id: string): Promise<void> {
    const result = await this.taskModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException('Task not found');
    }
  }
}
