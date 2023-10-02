import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ProviderEntity } from 'src/entities/inventory/provider.entity';
import { AttributeValueEntity } from 'src/entities/product/attribute-value.entity';
import { AttributeEntity } from 'src/entities/product/attribute.entity';
import { ProductAttributeValueEntity } from 'src/entities/product/product-attribute-value.entity';
import { ProductEntity } from 'src/entities/product/product.entity';

export class CreateProductAttributeValueDto
  implements Partial<ProductAttributeValueEntity>
{
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  attribute_value_id: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  provider_id: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  product_id: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  price: number;

  @ApiHideProperty()
  attribute_value: AttributeValueEntity;

  @ApiHideProperty()
  provider: ProviderEntity;

  @ApiHideProperty()
  product: ProductEntity;
}
