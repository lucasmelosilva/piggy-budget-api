import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserPayload } from '../model/UserPayload';

export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_TOKEN_SECRET as string,
    });
  }

  async validate(payload: UserPayload): Promise<any> {
    return Promise.resolve({
      id: payload.sub,
      email: payload.email,
      name: payload.name,
    });
  }
}
