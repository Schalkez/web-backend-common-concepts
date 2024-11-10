import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dtos/CreateUserDto';
import { UserResponseDto } from './dtos/UserResponseDto';
import { plainToClass } from 'class-transformer';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}
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

  async createUser(body: CreateUserDto): Promise<UserResponseDto> {
    const user = this.userRepository.create(body);
    const savedUser = await this.userRepository.save(user);
    return plainToClass(UserResponseDto, savedUser);
  }

  async findUser(id: number) {
    return this.userRepository.findOne({ where: { id } });
  }
}
