import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { UsersRepository } from 'src/users/users.repository';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly jwtService: JwtService,
  ) { }

  // TODO FINISH refreshToken & accessToken
  async signIn({ email, password }: AuthDto) {
    const user = await this.usersRepository.findOne({ email });

    if (!user) {
      throw new UnauthorizedException('Credentials are incorrect');
    }

    const isPasswordEqual = await bcrypt.compare(password, user.password);
    if (!isPasswordEqual) {
      throw new UnauthorizedException('Credentials are incorrect');
    }

    const payload = { email, password: user.password };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async signUp({ email, password }: AuthDto): Promise<AuthDto> {
    const user = await this.usersRepository.findOne({ email });
    if (user) {
      throw new BadRequestException('User with this email already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await this.usersRepository.create({
      email,
      password: hashedPassword,
    });

    return newUser;
  }
}
