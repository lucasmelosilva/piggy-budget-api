import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import { CreateUserDTO } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDTO: CreateUserDTO): Promise<Omit<User, 'password'>> {
    const user = {
      ...createUserDTO,
      password: await bcrypt.hash(createUserDTO.password, 10),
    };
    const result = await this.userRepository.save(user);
    // eslint-disable-next-line
    const { password, ...userWithoutPassword } = result;
    return userWithoutPassword;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.userRepository.findOne({ where: { email } });
    return user;
  }

  async findById(id: string): Promise<User | null> {
    const user = await this.userRepository.findOne({ where: { id } });
    return user;
  }

  async emailVerified(id: string): Promise<void> {
    await this.userRepository.update(id, { isEmailVerified: true });
  }
}
