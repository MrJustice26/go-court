import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConfig } from 'src/config/jwt.config';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [UsersModule, JwtModule.register(jwtConfig)],
})
export class AuthModule {}
