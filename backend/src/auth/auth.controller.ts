import {
  Controller,
  HttpCode,
  HttpStatus,
  Body,
  Post,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dot';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private readonly configService: ConfigService,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(
    @Body() signInDto: AuthDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const accessToken = await this.authService.signIn(signInDto);
    response.cookie('token', accessToken.access_token, {
      httpOnly: true,
      domain: this.configService.get<string>('frontendDomain'),
    });

    return { access_token: accessToken.access_token };
  }

  @HttpCode(HttpStatus.OK)
  @Post('register')
  async signUp(@Body() signUpDto: AuthDto): Promise<AuthDto> {
    return this.authService.signUp(signUpDto);
  }
}
