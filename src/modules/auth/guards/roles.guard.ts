import { Reflector } from '@nestjs/core';

import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { RolesEnum } from 'src/modules/common/enum/role.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
  canActivate(context: ExecutionContext): boolean {
    const requiereRoles = this.reflector.get<RolesEnum[]>(
      RolesEnum,
      context.getHandler(),
    );

    if (!requiereRoles) {
      // Si no se define ningún rol como metadata, se permite el acceso por defecto.
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const userRoles: RolesEnum[] = request.user.roles;

    // Si no hay roles de usuario, se niega el acceso.
    if (!userRoles) {
      return false;
    }

    return requiereRoles.every((requiredRole) =>
      userRoles.includes(requiredRole),
    );
  }
}
