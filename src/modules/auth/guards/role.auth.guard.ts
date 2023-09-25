import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { RolesEnum } from '../../common/enum/role.enum';
import { ROLES_KEY } from '../decorators/roles.decorator';

@Injectable()
export class RoleAuthGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const role = this.reflector.getAllAndOverride<RolesEnum>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    // Si el endpoint no pide rol pasa
    if (!role) {
      return true;
    }

    // Admin pasa a todos los endpoint
    const { user } = context.switchToHttp().getRequest();
    // if (user.roles === RolesEnum.ADMIN) {
    //   return true;
    // } 
    if (user.roles === RolesEnum) {
      return true;
    }
    else {
      throw new UnauthorizedException('No autorizado');
    }

    // Verifica si el rol que se recibe es correcto
    // if (!user.roles || user.roles !== role.includes(user.roles)) {
    //   throw new UnauthorizedException();
    // }

    return role === user.roles;
  }
}
