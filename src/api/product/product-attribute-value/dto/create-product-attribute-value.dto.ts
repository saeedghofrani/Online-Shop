import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ProviderEntity } from 'src/entities/INVENTORY/provider.entity';
import { AttributeValueEntity } from 'src/entities/PRODUCT/attribute-value.entity';
import { AttributeEntity } from 'src/entities/PRODUCT/attribute.entity';
import { ProductAttributeValueEntity } from 'src/entities/PRODUCT/product-attribute-value.entity';
import { ProductEntity } from 'src/entities/PRODUCT/product.entity';

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
