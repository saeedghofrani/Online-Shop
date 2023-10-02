import { ApiProperty } from '@nestjs/swagger';
import { UserPaymentEntity } from 'src/entities/wallet/user-payment.entity';

export class UpdateUserPaymentDto implements Partial<UserPaymentEntity> {
  @ApiProperty()
  dou_date: Date;

  @ApiProperty()
  amount: number;
}
