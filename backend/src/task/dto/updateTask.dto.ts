import { PartialType } from '@nestjs/mapped-types';
import { CreateTaskDto } from './createTask.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateTaskDto extends PartialType(CreateTaskDto) {
  @ApiPropertyOptional({
    description: 'El título de la tarea (opcional, máximo 30 caracteres)',
    example: 'Actualizar la presentación',
  })
  title?: string;

  @ApiPropertyOptional({
    description:
      'La descripción de la tarea (opcional, sin límite de caracteres)',
    example: 'Actualizar las diapositivas con los datos más recientes',
  })
  description?: string;

  @ApiPropertyOptional({
    description: 'Indica si la tarea está completada o no (opcional)',
    example: true,
  })
  completed?: boolean;
}
