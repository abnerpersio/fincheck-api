import { Body, Controller, Post } from '@nestjs/common';
import { IsPublic } from '~shared/decorators/is-public';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup';
import { SiginDto } from './dto/singin.dto';

@Controller('auth')
@IsPublic()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  create(@Body() data: SignupDto) {
    return this.authService.signup(data);
  }

  @Post('/signin')
  signin(@Body() data: SiginDto) {
    return this.authService.signin(data);
  }
}
