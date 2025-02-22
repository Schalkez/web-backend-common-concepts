import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dtos/CreateUserDto';
import { UserResponseDto } from '../dtos/UserResponseDto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user.entity';
import { Repository } from 'typeorm';
import { plainToClass } from 'class-transformer';
import { HashingProvider } from '@/auth/providers/hashing.provider';

@Injectable()
export class CreateUserProvider {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly hashingProvider: HashingProvider,
  ) {}

  async createUser(body: CreateUserDto): Promise<UserResponseDto> {
    try {
      const user = await this.userRepository.findOne({
        where: { email: body.email },
      });

      if (user) {
        throw new Error('User already exists');
      }

      const newUser = this.userRepository.create({
        ...body,
        password: await this.hashingProvider.hashPassword(body.password),
      });

      const savedUser = await this.userRepository.save(newUser);
      return plainToClass(UserResponseDto, savedUser);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
