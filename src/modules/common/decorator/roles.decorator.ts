import { SetMetadata } from "@nestjs/common";
import { RolesEnum } from "../enum/role.enum";

export const Roles = (...roles: RolesEnum[]) => 
    SetMetadata('roles', roles)