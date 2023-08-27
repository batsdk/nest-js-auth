import { Controller, Post, Body, Get,Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthGaurd } from 'src/gaurds/auth.gaurd';

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

  @UseGuards(AuthGaurd)
  @Get("/user")
  getUserDetails(@Request() request){
    return request.user;
  }

}
