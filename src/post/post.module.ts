import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { Post } from './post.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/user/user.module';
import { PaginationModule } from '@/common/pagination/pagination.module';

@Module({
  imports: [TypeOrmModule.forFeature([Post]), UserModule, PaginationModule],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}
