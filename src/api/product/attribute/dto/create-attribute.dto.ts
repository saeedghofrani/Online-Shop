import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { AttributeEntity } from 'src/entities/PRODUCT/attribute.entity';
import { CategoryEntity } from 'src/entities/PRODUCT/category.entity';

export class CreateAttributeDto implements Partial<AttributeEntity> {
  @ApiProperty()
  name: string;

  @ApiHideProperty()
  category: CategoryEntity[];

  @ApiProperty()
  category_id?: string[];
}
