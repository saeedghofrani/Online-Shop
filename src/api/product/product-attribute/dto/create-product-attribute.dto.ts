import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { AttributeEntity } from 'src/entities/PRODUCT/attribute.entity';
import { ProductEntity } from 'src/entities/PRODUCT/product.entity';

export class CreateProductAttribute {
  @ApiHideProperty()
  product: ProductEntity;

  @ApiHideProperty()
  attribute: AttributeEntity;

  @ApiProperty()
  value: string;

  @ApiProperty()
  unit: string;
}
