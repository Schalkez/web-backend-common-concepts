import { Injectable } from '@nestjs/common';
import { SignInDto } from '../dtos/signin.dto';
import { SignInProvider } from './sign-in.provider';
import { SignUpProvider } from './sign-up.provider';
import { CreateUserDto } from '@/user/dtos/CreateUserDto';

@Injectable()
export class AuthService {
  constructor(
    private readonly signInProvider: SignInProvider,
    private readonly signUpProvider: SignUpProvider,
  ) {}

  async login(payload: SignInDto) {
    return this.signInProvider.signIn(payload);
  }

  async register(payload: CreateUserDto) {
    return this.signUpProvider.signUp(payload);
  }
}
