import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { UserEntity } from 'src/users/users.entity';
import { UserPayload } from './model/UserPayload';
import { JwtService } from '@nestjs/jwt';
import { UserToken } from './model/UserToken';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  login(user: UserEntity): UserToken {
    const payload: UserPayload = {
      sub: user.id,
      email: user.email,
      name: user.name,
    };

    const jwtToken = this.jwtService.sign(payload);
    return {
      access_token: jwtToken,
    };
  }

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);
    if (user) {
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (isPasswordValid) {
        return {
          ...user,
          password: undefined,
        };
      }
    }

    throw new Error('Email address or password provided is incorrect.');
  }
}
