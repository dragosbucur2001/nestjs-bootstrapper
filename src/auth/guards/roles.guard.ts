import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '@prisma/client';
import { Observable } from 'rxjs';
import { ROLES_KEY } from '../decorators/role.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) { }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
            context.getHandler(),
            context.getClass()
        ]);

        const req = context.switchToHttp().getRequest();
        const role = req.user.role

        if (role === Role.ADMIN) return true;
        else if (!requiredRoles || requiredRoles.length === 0) return true;
        else if (!requiredRoles.find(r => r === Role.ADMIN)) return true;

        return false;
    }

}
