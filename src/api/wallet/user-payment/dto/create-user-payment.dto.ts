import { Column } from 'typeorm';
import { ColumnNumericTransformer } from '../../../../common/classes/column-numeric-transformer.class';
import { ApiProperty } from '@nestjs/swagger';
import { UserPaymentEntity } from 'src/entities/WALLET/user-payment.entity';

export class CreateUserPaymentDto implements Partial<UserPaymentEntity> {
  @ApiProperty()
  dou_date: Date;

  @ApiProperty()
  amount: number;
}
