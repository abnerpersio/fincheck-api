import { Body, Controller, Post } from '@nestjs/common';
import { IsPublic } from '~shared/decorators/is-public';
import { AuthService } from './auth.service';
import { SignupDTO } from './dto/signup.dto';
import { SiginDTO } from './dto/singin.dto';

@Controller('auth')
@IsPublic()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  create(@Body() data: SignupDTO) {
    return this.authService.signup(data);
  }

  @Post('/signin')
  signin(@Body() data: SiginDTO) {
    return this.authService.signin(data);
  }
}
