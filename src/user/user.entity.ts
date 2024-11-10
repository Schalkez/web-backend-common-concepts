import { Post } from 'src/post/post.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, nullable: false, length: 100 })
  email: string;

  @Column({ nullable: false, length: 50 })
  password: string;

  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];
}
