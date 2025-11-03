import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './users.entity';
import * as bcrypt from 'bcrypt';
import { CreateUserDTO } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async create(
    createUserDTO: CreateUserDTO,
  ): Promise<Omit<UserEntity, 'password'>> {
    const user = {
      ...createUserDTO,
      password: await bcrypt.hash(createUserDTO.password, 10),
    };
    const result = await this.userRepository.save(user);
    // eslint-disable-next-line
    const { password, ...userWithoutPassword } = result;
    return userWithoutPassword;
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    const user = await this.userRepository.findOne({ where: { email } });
    return user;
  }

  async findById(id: string): Promise<UserEntity | null> {
    const user = await this.userRepository.findOne({ where: { id } });
    return user;
  }

  async emailVerified(id: string): Promise<void> {
    await this.userRepository.update(id, { isEmailVerified: true });
  }
}
