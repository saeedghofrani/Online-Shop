import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { UserEntity } from 'entities/auth/user.entity';
import { AccountEntity } from 'entities/wallet/account.entity';

export class CreateAccountDto implements Partial<AccountEntity> {
  @ApiHideProperty()
  user: UserEntity;

  @ApiProperty()
  account: string;

  @ApiProperty()
  iban: string;
}
