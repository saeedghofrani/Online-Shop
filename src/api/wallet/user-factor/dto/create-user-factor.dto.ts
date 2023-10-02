import { Column, ManyToOne } from 'typeorm';
import { ColumnNumericTransformer } from '../../../../common/classes/column-numeric-transformer.class';
import { PenaltyType } from '../../../../entities/wallet/enum/penalty-type.enum';
import { PatternMasterEntity } from '../../../../entities/wallet/pattern-master.entity';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { installmentType } from 'entities/wallet/enum/installment-type.enum';
import { UserFactorEntity } from 'entities/wallet/user-factor.entity';

export class CreateUserFactorDto implements Partial<UserFactorEntity> {
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

  @ApiHideProperty()
  pattern_master: PatternMasterEntity;
}
