import { Body, Controller, Post, UsePipes } from "@nestjs/common";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { AuthService } from "./auth.service";
import { ApiOperation, ApiProperty, ApiResponse } from "@nestjs/swagger";
import { User } from "../users/schemas/user.schema";
import { Prop } from "@nestjs/mongoose";
import { ValidationPipe } from "../pipes/validation.pipe";

class Auth {
  @ApiProperty({ example: 'IkpXVCJ9.eyJlb', description: 'Токен' })
  @Prop({ isRequired: true})
  token: string

  @ApiProperty({ example: { email: 'user@mail.ru', password: 'qwerty123' }, description: 'Пользователь' })
  @Prop({ isRequired: true})
  user: User
}
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService){ }

  @ApiOperation({ summary: 'Авторизация пользователя' })
  @ApiResponse({ status: 200, type: Auth })
  @UsePipes(ValidationPipe)
  @Post('/login')
  login(@Body() userDto: CreateUserDto) {
    return this.authService.login(userDto)
  }

  @ApiOperation({ summary: 'Регистрация пользователя' })
  @ApiResponse({ status: 200, type: Auth })
  @UsePipes(ValidationPipe)
  @Post('/registration')
  registration(@Body() userDto: CreateUserDto) {
    return this.authService.registration(userDto)
  }
}
