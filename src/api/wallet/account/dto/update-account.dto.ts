import { ApiProperty } from '@nestjs/swagger';
import { AccountEntity } from 'src/entities/wallet/account.entity';

export class UpdateAccountDto implements Partial<AccountEntity> {
  @ApiProperty()
  account: string;

  @ApiProperty()
  iban: string;
}
