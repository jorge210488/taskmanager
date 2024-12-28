import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({
    description:
      'El email del usuario, debe tener la estructura valida de un email y no puede estar vacío',
    example: 'jorge@email.com',
  })
  email: string;

  @IsNotEmpty()
  @IsString()
  @Length(8, 15)
  @ApiProperty({
    description:
      'El password del usuario, no puede estar vacío y debe contener entre 8 y 15 caracteres.',
    example: 'Prueba123!',
  })
  password: string;
}
