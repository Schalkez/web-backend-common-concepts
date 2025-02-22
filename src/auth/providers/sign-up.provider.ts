import { UserService } from '@/user/providers/user.service';
import { Injectable } from '@nestjs/common';
import { HashingProvider } from './hashing.provider';

@Injectable()
export class SignUpProvider {
  constructor(
    private readonly userService: UserService,
    private readonly hashingProvider: HashingProvider,
  ) {}

  async signUp(signUpDto: any) {
    try {
      const user = await this.userService.createUser(signUpDto);
      return user;
    } catch (error) {
      throw error;
    }
  }
}
