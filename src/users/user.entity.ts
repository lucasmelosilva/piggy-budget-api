import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'email', nullable: false, unique: true })
  email: string;

  @Column({ name: 'password', nullable: false })
  password: string;

  @Column({ name: 'name', nullable: false })
  name: string;

  @Column({ name: 'last_name', nullable: true })
  lastName: string;

  @Column({ name: 'image_url', nullable: true, default: '' })
  imageUrl: string;

  @Column({ name: 'is_email_verified', default: false })
  isEmailVerified: boolean;
}
