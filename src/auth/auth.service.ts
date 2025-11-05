import { ConflictException, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { UserEntity } from 'src/users/users.entity';
import { UserPayload } from './model/UserPayload';
import { JwtService } from '@nestjs/jwt';
import { UserToken } from './model/UserToken';
import { CreateUserDTO } from 'src/users/dto/create-user.dto';
import { MailService } from 'src/mail/mail.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService,
  ) {}

  private makePayload(user: UserEntity): UserPayload {
    return {
      sub: user.id,
      email: user.email,
      name: user.name,
    };
  }

  login(user: UserEntity): UserToken {
    const payload: UserPayload = this.makePayload(user);

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

  async signup(user: CreateUserDTO) {
    const isUserExists = await this.usersService.findByEmail(user.email);
    if (isUserExists) {
      throw new ConflictException('User with this email already exists.');
    }
    const payload: Partial<UserPayload> = {
      email: user.email,
      name: user.name,
    };
    const jwtToken = this.jwtService.sign(payload, {
      expiresIn: '4h',
      secret: process.env.SECRET_EMAIL_VERIFICATION_TOKEN as string,
    });
    await this.mailService.sendEmailVerification(user.email, jwtToken);
    await this.usersService.create(user);
  }
}
