import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category, Typing } from './category.entity';
import { Repository } from 'typeorm';

type updateType = {
  id: number;
  userId: string;
};

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto) {
    await this.categoryRepository.insert(createCategoryDto);
  }

  async findAll(userId: string) {
    return await this.categoryRepository.find({ where: { userId } });
  }

  async findAllByType(type: Typing, userId: string) {
    return await this.categoryRepository.find({ where: { type, userId } });
  }

  async findOne(id: number, userId: string) {
    return await this.categoryRepository.find({ where: { id, userId } });
  }

  async update(
    { id, userId }: updateType,
    updateCategoryDto: UpdateCategoryDto,
  ) {
    await this.categoryRepository.update({ id, userId }, updateCategoryDto);
    return await this.categoryRepository.find({ where: { id, userId } });
  }

  async remove(id: number, userId: string) {
    return await this.categoryRepository.delete({ id, userId });
  }
}
