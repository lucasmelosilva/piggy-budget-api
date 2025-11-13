import { IsEnum, IsOptional, IsString } from 'class-validator';
import { Typing } from '../category.entity';

export class CreateCategoryDto {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsEnum(Typing)
  type: Typing;
}
