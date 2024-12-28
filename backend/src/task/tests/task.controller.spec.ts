import { Test, TestingModule } from '@nestjs/testing';
import { TaskController } from '../controllers/task.controller';
import { TaskService } from '../services/task.service';
import { CreateTaskDto } from '../dto/createTask.dto';
import { UpdateTaskDto } from '../dto/updateTask.dto';
import { TaskStatus } from '../enums/taskStatus.enum';
import { TaskDocument } from '../schemas/task.schema';

describe('TaskController', () => {
  let controller: TaskController;
  let service: TaskService;

  const mockTaskService = {
    createTask: jest.fn(),
    getTasks: jest.fn(),
    getTaskById: jest.fn(),
    updateTask: jest.fn(),
    deleteTask: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TaskController],
      providers: [{ provide: TaskService, useValue: mockTaskService }],
    })
      .overrideGuard('AuthGuard') // Ignorar AuthGuard en las pruebas
      .useValue({})
      .compile();

    controller = module.get<TaskController>(TaskController);
    service = module.get<TaskService>(TaskService);
  });

  it('Debe estar definido', () => {
    expect(controller).toBeDefined();
  });

  describe('crear tarea', () => {
    it('Debe llamar al servicio de crear tareas con éxito', async () => {
      const createTaskDto: CreateTaskDto = {
        title: 'Creando Tarea de prueba',
        description: 'Estamos probando la funcionalidad al crear la tarea',
      };
      const result: TaskDocument = {
        title: 'Creando Tarea de prueba',
        description: 'Estamos probando la funcionalidad al crear la tarea',
      } as TaskDocument;

      mockTaskService.createTask.mockResolvedValue(result);

      expect(await controller.createTask(createTaskDto)).toBe(result);
      expect(mockTaskService.createTask).toHaveBeenCalledWith(createTaskDto);
    });
  });

  describe('obtener tareas', () => {
    it('Debe llamar al servicio getTasks y devolver el resultado filtrado', async () => {
      const result: TaskDocument[] = [
        {
          _id: '1',
          title: 'Tarea de prueba',
          completed: false,
        } as TaskDocument,
      ];

      mockTaskService.getTasks.mockResolvedValue(result);

      expect(await controller.getTasks(TaskStatus.PENDING)).toBe(result);
      expect(mockTaskService.getTasks).toHaveBeenCalledWith(TaskStatus.PENDING);
    });

    it('Debe llamar al servicio getTasks sin filtro y devolver todas las tareas', async () => {
      const result: TaskDocument[] = [
        {
          _id: '1',
          title: 'Tarea de prueba',
          completed: false,
        } as TaskDocument,
      ];

      mockTaskService.getTasks.mockResolvedValue(result);

      expect(await controller.getTasks()).toBe(result);
      expect(mockTaskService.getTasks).toHaveBeenCalledWith(undefined);
    });
  });

  describe('obtener tarea por ID', () => {
    it('Debe llamar al servicio getTaskById y devolver el resultado', async () => {
      const result: TaskDocument = {
        _id: '1',
        title: 'Tarea de prueba',
      } as TaskDocument;

      mockTaskService.getTaskById.mockResolvedValue(result);

      expect(await controller.getTaskById('1')).toBe(result);
      expect(mockTaskService.getTaskById).toHaveBeenCalledWith('1');
    });
  });

  describe('actualizar tarea', () => {
    it('Debe llamar al servicio updateTask y devolver el resultado', async () => {
      const updateTaskDto: UpdateTaskDto = { title: 'Tarea actualizada' };
      const result: TaskDocument = {
        _id: '1',
        title: 'Tarea actualizada',
      } as TaskDocument;

      mockTaskService.updateTask.mockResolvedValue(result);

      expect(await controller.updateTask('1', updateTaskDto)).toBe(result);
      expect(mockTaskService.updateTask).toHaveBeenCalledWith(
        '1',
        updateTaskDto,
      );
    });
  });

  describe('eliminar tarea', () => {
    it('Debe llamar al servicio deleteTask y devolver void', async () => {
      mockTaskService.deleteTask.mockResolvedValue(undefined);

      expect(await controller.deleteTask('1')).toBeUndefined();
      expect(mockTaskService.deleteTask).toHaveBeenCalledWith('1');
    });
  });
});
