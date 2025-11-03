import { Request } from 'express';
import { UserEntity } from 'src/users/users.entity';

export interface AuthRequest extends Request {
  user: UserEntity;
}
