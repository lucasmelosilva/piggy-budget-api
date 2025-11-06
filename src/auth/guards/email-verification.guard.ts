import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { UserPayload } from '../model/UserPayload';

@Injectable()
export class EmailVerificationGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const token = request.query.token as string;

    if (!token) {
      throw new UnauthorizedException('Verification token is missing');
    }

    try {
      const secret = process.env.SECRET_EMAIL_VERIFICATION_TOKEN as string;
      const payload: Partial<UserPayload> = this.jwtService.verify(token, {
        secret,
      });
      request.user = payload; // Attach payload to request if needed
      return true;
      // eslint-disable-next-line
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired verification token');
    }
  }
}
