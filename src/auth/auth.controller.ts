import {
  Request,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
  Body,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthRequest } from './model/AuthRequest';
import { isPublic } from './decorators/is-public.decorator';
import { CreateUserDTO } from 'src/users/dto/create-user.dto';
@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @isPublic()
  @Post('signin')
  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  login(@Request() req: AuthRequest) {
    return this.authService.login(req.user);
  }

  @isPublic()
  @Post('signup')
  async signUp(@Body() user: CreateUserDTO) {
    return await this.authService.signup(user);
  }
}
