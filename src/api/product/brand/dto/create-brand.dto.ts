import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { BrandEntity } from 'src/entities/product/brand.entity';

export class CreateBrandDto implements Partial<BrandEntity> {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  original_name: string;

  @ApiProperty()
  description: string;
}
