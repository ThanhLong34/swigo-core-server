import { CanActivate, ExecutionContext } from '@nestjs/common';

export class IsAdminGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    return request.currentUser?.isAdmin;
  }
}
