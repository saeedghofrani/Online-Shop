import { ApiProperty } from '@nestjs/swagger';
import { BrandEntity } from 'src/entities/product/brand.entity';

export class CreateBrandDto implements Partial<BrandEntity> {
  @ApiProperty()
  name: string;

  @ApiProperty()
  original_name: string;

  @ApiProperty()
  description: string;
}
