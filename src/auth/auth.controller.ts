import {
  Request,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
  Body,
  Get,
  Redirect,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthRequest } from './model/AuthRequest';
import { isPublic } from './decorators/is-public.decorator';
import { CreateUserDTO } from 'src/users/dto/create-user.dto';
import { EmailVerificationGuard } from './guards/email-verification.guard';
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

  @isPublic()
  @Get('verify-email')
  @UseGuards(EmailVerificationGuard)
  @Redirect('http://localhost:3000', 302)
  async verifyEmail(@Request() req: AuthRequest) {
    await this.authService.verifyEmail(req.user.email);
  }
}
