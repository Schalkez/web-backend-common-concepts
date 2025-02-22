import { forwardRef, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './providers/auth.service';
import { UserModule } from '@/user/user.module';
import { BcryptProvider } from './providers/bcrypt.provider';
import { HashingProvider } from './providers/hashing.provider';
import { SignInProvider } from './providers/sign-in.provider';
import { SignUpProvider } from './providers/sign-up.provider';
import { ConfigModule } from '@nestjs/config';
import jwtConfig from './configs/jwt.config';
import { JwtModule, JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    forwardRef(() => UserModule),
    ConfigModule.forFeature(jwtConfig),
    JwtModule.registerAsync(jwtConfig.asProvider()),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    { provide: HashingProvider, useClass: BcryptProvider },
    SignInProvider,
    SignUpProvider,
    JwtService,
  ],
  exports: [AuthService, HashingProvider],
})
export class AuthModule {}
