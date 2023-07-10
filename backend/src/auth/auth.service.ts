import { Injectable } from '@nestjs/common';
import { SignInDto } from './dto/sign-in.dot';
import { UsersRepository } from 'src/users/users.repository';
import { SignUpDto } from './dto/sign-up.dot';

@Injectable()
export class AuthService {
  constructor(private readonly usersRepository: UsersRepository) {}
  async signIn(signInDto: SignInDto): Promise<SignInDto> {
    const user = await this.usersRepository.findOne(signInDto);
    return user;
  }

  async signUp(signUpDto: SignUpDto): Promise<SignUpDto> {
    const newUser = await this.usersRepository.create(signUpDto);
    return newUser;
  }
}
