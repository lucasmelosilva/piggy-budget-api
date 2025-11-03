import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }

  handleRequest(err, user) {
    // eslint-disable-next-line
    if (err || !user || !user.isEmailVerified) {
      // eslint-disable-next-line
      throw new UnauthorizedException(err?.message);
    }
    // eslint-disable-next-line
    return user;
  }
}
