import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';

export class LoginDto {
  @IsNotEmpty({ message: 'El correo es requerido' })
  @IsEmail({},{message: 'Email no válido.'})
  email: string;

  @Transform(({ value }) => value.trim())
  @IsString()
  @MinLength(6, { message: 'Debe tener un mínimo de 6 caracteres' })
  @IsNotEmpty({ message: 'La contraseña es requerida' })
  password: string;
}
