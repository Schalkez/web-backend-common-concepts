import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { SignInDto } from '../dtos/signin.dto';
import { UserService } from '@/user/providers/user.service';
import { HashingProvider } from './hashing.provider';
import { JwtService } from '@nestjs/jwt';
import jwtConfig from '../configs/jwt.config';
import { ConfigType } from '@nestjs/config';

@Injectable()
export class SignInProvider {
  constructor(
    private readonly userService: UserService,
    private readonly hashingProvider: HashingProvider,
    private readonly jwtService: JwtService,
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
  ) {}

  async signIn(signInDto: SignInDto) {
    try {
      const user = await this.userService.findUserByEmail(signInDto.email);
      const isEqual = await this.hashingProvider.comparePassword(
        signInDto.password,
        user.password,
      );

      if (!isEqual) {
        throw new UnauthorizedException('Invalid credentials');
      }

      const accessToken = await this.jwtService.signAsync(
        {
          sub: user.id,
          email: user.email,
        },
        {
          expiresIn: this.jwtConfiguration.accessTokenTtl,
          audience: this.jwtConfiguration.audience,
          secret: this.jwtConfiguration.secret,
          issuer: this.jwtConfiguration.issuer,
        },
      );

      return { accessToken };
    } catch (error) {
      throw error;
    }
  }
}
