import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './providers/auth.service';
import { SignInDto } from './dtos/signin.dto';
import { CreateUserDto } from '@/user/dtos/CreateUserDto';
import { ConfigService } from '@nestjs/config';
import { Auth } from './decorators/auth.decorator';
import { AuthType } from './enums/auth-type.enum';
import { ApiBearerAuth, ApiBody } from '@nestjs/swagger';

@Controller('auth')
@ApiBearerAuth()
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private configService: ConfigService,
  ) {}

  @ApiBody({
    schema: {
      example: {
        email: 'user@gmail.com',
        password: '123456',
      },
    },
  })
  @Post('sign-in')
  @HttpCode(HttpStatus.OK)
  @Auth(AuthType.None)
  async login(@Body() body: SignInDto) {
    const environment = this.configService.get<string>('appConfig.environment');
    console.log(`Environment: ${environment}`);
    return this.authService.login(body);
  }

  @ApiBody({
    schema: {
      example: {
        email: 'user@gmail.com',
        password: '123456',
      },
    },
  })
  @Post('sign-up')
  @Auth(AuthType.None)
  async register(@Body() body: CreateUserDto) {
    return this.authService.register(body);
  }
}
