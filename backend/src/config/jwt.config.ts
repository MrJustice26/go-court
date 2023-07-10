import { JwtModuleOptions } from '@nestjs/jwt';
import 'dotenv/config';

export const jwtConfig: JwtModuleOptions = {
  secret: process.env.JWT_SECRET,
  signOptions: {
    expiresIn: '30m',
  },
};
