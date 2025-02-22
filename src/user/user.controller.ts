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
import { UserService } from './providers/user.service';
import { CreateUserDto } from './dtos/CreateUserDto';
import { PatchUserDto } from './dtos/PatchUserDto';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { GetUserParamDto } from './dtos/GetUserParamDto';
import { CreateUserProvider } from './providers/create-user.provider';
import { Auth } from '@/auth/decorators/auth.decorator';
import { AuthType } from '@/auth/enums/auth-type.enum';

@Controller()
@ApiBearerAuth()
@ApiTags('Users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly createUserProvider: CreateUserProvider,
  ) {}

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
  @Auth(AuthType.Bearer)
  async getUsers(
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit?: number,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page?: number,
  ) {
    const users = await this.userService.getAllUsers(limit, page);
    return users;
  }

  @Get('user/:id')
  @Auth(AuthType.Bearer)
  async getUser(@Param() { id }: GetUserParamDto) {
    return this.userService.getUserById(id);
  }

  @Post('user')
  @Auth(AuthType.Bearer)
  async createUser(@Body() body: CreateUserDto) {
    const user = await this.createUserProvider.createUser(body);
    return user;
  }

  @Patch('user/:id')
  @Auth(AuthType.Bearer)
  async updateUser(@Body() patchUserDto: PatchUserDto) {
    return patchUserDto;
  }
}
