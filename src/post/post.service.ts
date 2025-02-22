import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './post.entity';
import { CreatePostDto } from './dtos/CreatePostDto';
import { UserService } from '@/user/providers/user.service';
import { GetPostsDto } from './dtos/get-post.dto';
import { PaginationProvider } from '@/common/pagination/providers/pagination.provider';
import { Paginated } from '@/common/pagination/interfaces/paginated.interface';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post) private readonly postRepository: Repository<Post>,
    private readonly userService: UserService,
    private readonly paginationProvider: PaginationProvider,
  ) {}

  async getPosts(query: GetPostsDto): Promise<Paginated<Post>> {
    return this.paginationProvider.paginate(query, this.postRepository);
  }

  async createPost(body: CreatePostDto): Promise<Post> {
    try {
      const user = await this.userService.findUserById(body.userId);
      const post = this.postRepository.create({ ...body, user });
      return this.postRepository.save(post);
    } catch (error) {
      console.log(error);
    }
  }
}
