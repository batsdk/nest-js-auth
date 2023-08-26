import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private service: AuthService) {}

  @Post('/register')
  createUser(@Body() user: CreateUserDto) {
    return this.service.singUp(user);
  }
  @Post('/login')
  logUser(@Body() user: CreateUserDto) {
    return this.service.singIn(user);
  }
}
