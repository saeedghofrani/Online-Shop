import {
  ApiHideProperty,
  ApiProperty,
  ApiPropertyOptional,
} from '@nestjs/swagger';
import { CategoryEntity } from 'src/entities/product/category.entity';

export class UpdateCategoryDto implements Partial<CategoryEntity> {
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
