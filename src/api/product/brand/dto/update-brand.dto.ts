import { ApiProperty } from '@nestjs/swagger';
import { BrandEntity } from 'entities/product/brand.entity';

export class UpdateBrandDto implements Partial<BrandEntity> {
  @ApiProperty()
  name: string;

  @ApiProperty()
  original_name: string;

  @ApiProperty()
  description: string;
}
