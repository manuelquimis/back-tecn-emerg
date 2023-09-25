import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RolesEnum } from '../enum/role.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.get<RolesEnum[]>(
      'roles',
      context.getHandler(),
    );

    // Si no se define ningún rol como metadata, se permite el acceso por defecto.
    if (!requiredRoles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const userRoles: RolesEnum[] = request.user.roles;

    // Usuario ADMIN acceso total
    if (request.user.roles === RolesEnum.ADMIN) {
      return true;
    }

    // Si no hay roles de usuario, se niega el acceso.
    if (!userRoles) {
      throw UnauthorizedException;
      return false;
    }

    return requiredRoles.every((requiredRole) =>
      userRoles.includes(requiredRole),
    );
  }
}
