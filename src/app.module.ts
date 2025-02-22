import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { PostModule } from './post/post.module';
import { PaginationModule } from './common/pagination/pagination.module';
import { AuthModule } from './auth/auth.module';
import AppDataSource from './data-source';
import { ConfigModule } from '@nestjs/config';
import appConfig from './configs/app.config';
import { JwtModule, JwtService } from '@nestjs/jwt';
import jwtConfig from './auth/configs/jwt.config';
import { APP_GUARD } from '@nestjs/core';
import { configValidationSchema } from './configs/environment.validation';
import { AuthenticationGuard } from './auth/guards/authentication/authentication.guard';
import { AccessTokenGuard } from './auth/guards/access-token/access-token.guard';

@Module({
  imports: [
    TypeOrmModule.forRoot(AppDataSource.options),
    UserModule,
    PostModule,
    PaginationModule,
    ConfigModule.forFeature(jwtConfig),
    JwtModule.registerAsync(jwtConfig.asProvider()),
    AuthModule,
    ConfigModule.forRoot({
      validationSchema: configValidationSchema,
      load: [appConfig],
      isGlobal: true,
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    JwtService,
    AccessTokenGuard,
    { provide: APP_GUARD, useClass: AuthenticationGuard },
  ],
})
export class AppModule {}
