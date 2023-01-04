import { ApiProperty } from '@nestjs/swagger';

export class UpdatePaymentDto {
  @ApiProperty()
  pre_payment: number;

  @ApiProperty()
  remain: number;

  @ApiProperty()
  month: number;
}
