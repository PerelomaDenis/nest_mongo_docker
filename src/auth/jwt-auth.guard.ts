import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAuthGuard implements CanActivate{
  constructor(private jstService: JwtService){ }
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest()
    try {
      const authHeader = req.header.authorization
      const [bearer, token] = authHeader.split(' ')
      if (bearer !== 'Bearer' && !token) {
        throw new UnauthorizedException({ message: 'Пользователь не авторизован' })
      }
      const user = this.jstService.verify(token)
      req.user =  user
      return true
    } catch (e) {
      throw new UnauthorizedException({ message: 'Пользователь не авторизован' })
    }
  }

}