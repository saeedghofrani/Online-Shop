import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { UserEntity } from 'src/entities/auth/user.entity';
import { AccountEntity } from 'src/entities/wallet/account.entity';

export class CreateAccountDto implements Partial<AccountEntity> {
  @ApiHideProperty()
  user: UserEntity;

  @ApiProperty()
  account: string;

  @ApiProperty()
  iban: string;
}
