import { User } from 'src/user/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true, length: 100 })
  title: string;

  @Column({ nullable: true, length: 300, unique: true })
  slug: string;

  @Column({ nullable: true })
  schema: string;

  @ManyToOne(() => User, (user) => user.posts)
  user: User;
}
