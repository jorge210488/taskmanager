import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
  Matches,
  Validate,
} from 'class-validator';
import { MatchPassword } from '../decorators/match.decorator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @IsNotEmpty({ message: 'El nombre no puede estar vacío' })
  @IsString({ message: 'El nombre debe ser una cadena de texto' })
  @Length(3, 80, {
    message: 'El nombre debe tener entre 3 y 80 caracteres',
  })
  @ApiProperty({
    description:
      'El nombre del usuario, no puede estar vacío, debe tener como mínimo 3 caracteres y un máximo de 80',
    example: 'Jorge Martínez',
  })
  name: string;

  @IsNotEmpty({ message: 'El email no puede estar vacío' })
  @IsString({ message: 'El email debe ser una cadena de texto' })
  @IsEmail({}, { message: 'El email debe tener un formato válido' })
  @ApiProperty({
    description:
      'El email del usuario, debe tener la estructura valida de un email y no puede estar vacío',
    example: 'jorge@email.com',
  })
  email: string;

  @IsNotEmpty({ message: 'El password no puede estar vacío' })
  @IsString({ message: 'El password debe ser una cadena de texto' })
  @Length(8, 15, {
    message: 'El password debe tener entre 8 y 15 caracteres',
  })
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]/,
    {
      message:
        'El password debe contener al menos una letra minúscula, una letra mayúscula, un número y uno de los siguientes caracteres especiales: !@#$%^&*',
    },
  )
  @ApiProperty({
    description:
      'El password del usuario, no puede estar vacío, debe contener al menos una letra minúscula, una letra mayúscula, un número y uno de los siguientes caracteres especiales: !@#$%^&*',
    example: 'Prueba123!',
  })
  password: string;

  @IsNotEmpty({ message: 'La confirmación del password no puede estar vacía' })
  @Validate(MatchPassword, ['password'], {
    message: 'La confirmación del password debe coincidir con el password',
  })
  @ApiProperty({
    description: 'Debe coincidir con el campo password',
    example: 'Prueba123!',
  })
  confirmPassword: string;
}
