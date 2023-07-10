import { Controller, HttpCode, HttpStatus, Body, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dot';
import { SignUpDto } from './dto/sign-up.dot';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(@Body() signInDto: SignInDto): Promise<SignInDto> {
    return this.authService.signIn(signInDto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('register')
  async signUp(@Body() signUpDto: SignUpDto): Promise<SignUpDto> {
    return this.authService.signUp(signUpDto);
  }
}
