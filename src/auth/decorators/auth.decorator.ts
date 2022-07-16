import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { Role } from '@prisma/client';
import { JwtAuthGuard } from '../guards/jwt.guard';
import { RolesGuard } from '../guards/roles.guard';
import { ROLES_KEY } from './role.decorator';

export function Auth(...roles: Role[]) {
    return applyDecorators(
        SetMetadata(ROLES_KEY, roles),
        UseGuards(JwtAuthGuard, RolesGuard),
    );
}
