import { Module } from '@nestjs/common';
import { UserService } from './providers/user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { CreateUserProvider } from './providers/create-user.provider';
import { AuthModule } from '@/auth/auth.module';
import { FindOneUserByEmailProvider } from './providers/find-one-user-by-email.provider';
import { JwtModule } from '@nestjs/jwt';
import jwtConfig from '@/auth/configs/jwt.config';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    AuthModule,
    ConfigModule.forFeature(jwtConfig),
    JwtModule.registerAsync(jwtConfig.asProvider()),
  ],
  providers: [
    UserService,
    CreateUserProvider,
    FindOneUserByEmailProvider,
    // { provide: APP_GUARD, useClass: AccessTokenGuard },
  ],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
