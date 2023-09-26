import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { CategoryEntity } from 'src/entities/PRODUCT/category.entity';

export class UpdateAttributeDto {
  @ApiProperty()
  name: string;

  @ApiHideProperty()
  category: CategoryEntity[];

  @ApiProperty()
  category_id?: string[];
}
