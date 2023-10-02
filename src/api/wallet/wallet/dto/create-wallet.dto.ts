import { WalletEntity } from 'src/entities/wallet/wallet.entity';
import { UserEntity } from '../../../../entities/auth/user.entity';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';

export class CreateWalletDto implements Partial<WalletEntity> {
  @ApiProperty()
  amount: number;

  @ApiProperty()
  amount_block: number;

  @ApiHideProperty()
  user?: UserEntity;
}
