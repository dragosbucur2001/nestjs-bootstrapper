import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dtos/login-user.dto';
import { RegisterUserDto } from './dtos/register-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() data: LoginUserDto) {
    return this.authService.login(data);
  }

  @Post('register')
  async register(@Body() data: RegisterUserDto) {
    return this.authService.register(data);
  }
}
