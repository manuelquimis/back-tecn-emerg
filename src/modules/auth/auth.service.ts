import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcryptjs from 'bcryptjs';

import { LoginDto } from './dto/login.dto';

import { UsuariosService } from '../usuarios/usuarios.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usuarioService: UsuariosService,
    private readonly jwtService: JwtService,
  ) {}

  async login({ email, password }: LoginDto) {
    // comprobar credenciales
    const usuario = await this.usuarioService.findOneByEmail(email);
    if (!usuario) {
      throw new UnauthorizedException('Correo incorrecto');
    }

    const pass = await bcryptjs.compare(password, usuario.password);
    if (!pass) {
      throw new UnauthorizedException('Contraseña incorrecta');
    }

    // jwt
    const payload = { sub: usuario.uuidUsuario, roles: usuario.roles, nombres: usuario.nombres, apellidos: usuario.apellidos, email: usuario.email, identificacion: usuario.identificacion, fechaCreado: usuario.fechaCreado };
    const token = await this.jwtService.signAsync(payload);
    return {
      token,
    };
  }
}
