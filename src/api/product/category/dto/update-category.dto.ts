import { ApiHideProperty, ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { CategoryEntity } from 'src/entities/PRODUCT/category.entity';

export class UpdateCategoryDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;
  
  @ApiPropertyOptional()
  parent_id?: string;

  @ApiHideProperty()
  parent: CategoryEntity;
}
