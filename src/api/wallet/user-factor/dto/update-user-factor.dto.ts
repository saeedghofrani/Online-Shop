import { ApiProperty } from '@nestjs/swagger';
import { installmentType } from 'src/entities/WALLET/enum/installment-type.enum';
import { UserFactorEntity } from 'src/entities/WALLET/user-factor.entity';
import { PenaltyType } from '../../../../entities/WALLET/enum/penalty-type.enum';

export class UpdateUserFactorDto implements Partial<UserFactorEntity> {
  @ApiProperty()
  purchase_date: Date;

  @ApiProperty()
  amount: number;

  @ApiProperty()
  installment_count: number;

  @ApiProperty()
  penaltyType: PenaltyType;

  @ApiProperty()
  total_amount: number;

  @ApiProperty()
  product_price: number;

  @ApiProperty()
  installmentType: installmentType;
}
