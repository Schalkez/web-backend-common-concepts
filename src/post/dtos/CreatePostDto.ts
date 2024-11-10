import { IsNotEmpty } from 'class-validator';

export class CreatePostDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  userId: number;

  @IsNotEmpty()
  slug: string;

  @IsNotEmpty()
  schema: string;
}
