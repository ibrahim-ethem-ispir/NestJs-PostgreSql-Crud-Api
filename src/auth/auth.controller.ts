import { AuthService } from './auth.service';
import { Controller, Post, Body } from '@nestjs/common';
import { AuthDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  register(@Body() dto: AuthDto) {
    console.log(dto);
    console.log({ dto });

    return this.authService.register(dto);
  }

  @Post('login')
  login() {
    return this.authService.login();
  }
}
