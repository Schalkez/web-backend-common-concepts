import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dtos/CreateUserDto';
import { PatchUserDto } from './dtos/PatchUserDto';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { GetUserParamDto } from './dtos/GetUserParamDto';

@Controller()
@ApiTags('Users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('users')
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
  })
  @ApiQuery({
    name: 'page',
    required: false,
    type: Number,
  })
  async getUsers(
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit?: number,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page?: number,
  ) {
    const users = await this.userService.getAllUsers(limit, page);
    return users;
  }

  @Get('user/:id')
  async getUser(@Param() { id }: GetUserParamDto) {
    return this.userService.getUserById(id);
  }

  @Post('user')
  async createUser(@Body() body: CreateUserDto) {
    const user = await this.userService.createUser(body);
    return user;
  }

  @Patch('user/:id')
  async updateUser(@Body() patchUserDto: PatchUserDto) {
    return patchUserDto;
  }
}
