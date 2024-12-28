import {
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  IsBoolean,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskDto {
  @IsNotEmpty({ message: 'El título no puede estar vacío' })
  @IsString({ message: 'El título debe ser una cadena de texto' })
  @MaxLength(30, {
    message: 'El título no puede tener más de 30 caracteres',
  })
  @ApiProperty({
    description:
      'El título de la tarea, no puede estar vacío y tiene un máximo de 30 caracteres',
    example: 'Comprar comida',
  })
  title: string;

  @IsOptional()
  @IsString({ message: 'La descripción debe ser una cadena de texto' })
  @ApiProperty({
    description: 'Descripción opcional de la tarea, sin límite de caracteres',
    example: 'Comprar frutas, vegetales y pan para la semana',
    required: false,
  })
  description?: string;

  @IsOptional()
  completed?: boolean;
}
