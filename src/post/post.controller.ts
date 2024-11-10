import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dtos/CreatePostDto';
import { ApiTags } from '@nestjs/swagger';
import { GetPostsDto } from './dtos/get-post.dto';

@Controller()
@ApiTags('Posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get('/posts')
  getAllPosts(@Query() query: GetPostsDto) {
    console.log(query);
    return this.postService.getPosts(query);
  }

  @Post('/post')
  createPost(@Body() body: CreatePostDto) {
    try {
      console.log(123);
      return this.postService.createPost(body);
    } catch (error) {
      console.log(error);
    }
  }
}
