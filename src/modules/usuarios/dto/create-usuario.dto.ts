import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';

export class CreateUsuarioDto {
  @IsEmail({},{message: 'Email no válido.'})
  @IsNotEmpty({message: 'Email es requerido.'})
  email: string;

  @IsString()
  @MinLength(6, {message: 'Contraseña: longitud minimo 6'})
  @IsNotEmpty({message: 'Contraseña es requerido.'})
  password: string;

  @Matches(/^[A-Za-záéíóúÁÉÍÓÚüÜñÑ\s]+$/, {
    message: 'Nombre: no debe contener números ni caracteres especiales.',
  })
  @MinLength(3,{message: 'Nombres: longitud minimo 3'})
  @IsNotEmpty({message: 'Nombres es requerido.', })
  @IsString()
  nombres: string;
  // primerNombre: string;

  // @Matches(/^[A-Za-záéíóúÁÉÍÓÚüÜñÑ\s]+$/, {
  //   message: 'Nombre: no debe contener números ni caracteres especiales.',
  // })
  // @MinLength(3,{message: 'Nombres: longitud minimo 3'})
  // @IsNotEmpty({message: 'Nombres es requerido.', })
  // @IsString()
  // segundoNombre: string;


  @Matches(/^[A-Za-záéíóúÁÉÍÓÚüÜñÑ\s]+$/, {
    message: 'Apellido: no debe contener números ni caracteres especiales.',
  })
  @MinLength(3,{message: 'Apellidos: longitud minimo 3'})
  @IsNotEmpty({message: 'Apellidos es requerido.', })
  @IsString()
  apellidos: string;
  // primerApellido: string;

  // @Matches(/^[A-Za-záéíóúÁÉÍÓÚüÜñÑ\s]+$/, {
  //   message: 'Apellido: no debe contener números ni caracteres especiales.',
  // })
  // @MinLength(3,{message: 'Apellidos: longitud minimo 3'})
  // @IsNotEmpty({message: 'Apellidos es requerido.', })
  // @IsString()
  // segundoApellido: string;

  @IsNumber({}, {message: 'Debe ser un número'})
  @IsNotEmpty({message: 'Identificacion es requerido.',})
  identificacion: number;

  @IsNotEmpty({message: 'Rol es requerido.', })
  roles: string;
}
