import { ApiProperty } from '@nestjs/swagger';
import { WalletEntity } from 'src/entities/WALLET/wallet.entity';

export class UpdateWalletDto implements Partial<WalletEntity> {
  @ApiProperty()
  amount: number;

  @ApiProperty()
  amount_block: number;
}
