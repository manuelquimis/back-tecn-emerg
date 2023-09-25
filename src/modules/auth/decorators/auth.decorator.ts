import { applyDecorators, UseGuards } from '@nestjs/common';

import { RolesEnum } from '../../common/enum/role.enum';

import { AuthGuard } from '../guards/auth.guard';
import { RoleAuthGuard } from '../guards/role.auth.guard';
import { Roles } from './roles.decorator';

export function Auth(role: RolesEnum) {
  return applyDecorators(Roles(role), UseGuards(AuthGuard, RoleAuthGuard));
}
