import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user.entity';
import { UserResponseDto } from '../dtos/UserResponseDto';
import { plainToClass } from 'class-transformer';
import { Repository } from 'typeorm';
import { CreateUserProvider } from './create-user.provider';
import { CreateUserDto } from '../dtos/CreateUserDto';
import { FindOneUserByEmailProvider } from './find-one-user-by-email.provider';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly findOneUserByEmailProvider: FindOneUserByEmailProvider,
    private readonly createUserProvider: CreateUserProvider,
  ) {}

  async createUser(body: CreateUserDto) {
    const user = await this.createUserProvider.createUser(body);
    return user;
  }

  async getAllUsers(limit?: number, page?: number) {
    console.log(limit, page);

    const users = this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.posts', 'posts')
      .getMany();

    return plainToClass(UserResponseDto, users);
  }

  async getUserById(id: number) {
    const user = this.userRepository.findOne({
      where: { id },
      relations: ['posts'],
    });
    return plainToClass(UserResponseDto, user);
  }

  async findUserById(id: number) {
    return this.userRepository.findOne({ where: { id } });
  }

  async findUserByEmail(email: string) {
    const user =
      await this.findOneUserByEmailProvider.findOneUserByEmail(email);

    return user;
  }
}
