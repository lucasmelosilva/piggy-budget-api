import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  name: string;

  @Column()
  lastName: string;

  @Column({ default: '' })
  imageUrl: string;

  @Column({ default: false })
  isVerified: boolean;

  @Column({ default: '' })
  accessToken: string;
}
