import { Column, ManyToOne } from 'typeorm';
import { ProductEntity } from '../../../../entities/PRODUCT/product.entity';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';

export class CreatePaymentDto {
  @ApiProperty()
  pre_payment: number;

  @ApiProperty()
  remain: number;

  @ApiProperty()
  month: number;

  @ApiHideProperty()
  product?: ProductEntity;
}
