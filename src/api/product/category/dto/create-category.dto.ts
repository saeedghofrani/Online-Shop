import {
  ApiHideProperty,
  ApiProperty,
  ApiPropertyOptional,
} from '@nestjs/swagger';
import { CategoryEntity } from 'entities/product/category.entity';

export class CreateCategoryDto implements Partial<CategoryEntity> {
  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  original_name: string;

  @ApiPropertyOptional()
  parent_id?: string;

  @ApiHideProperty()
  parent: CategoryEntity;
}
