import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { UserEntity } from 'entities/auth/user.entity';
import { ProviderEntity } from 'entities/inventory/provider.entity';

export class CreateProviderDto implements Partial<ProviderEntity> {
  @ApiProperty()
  address: string;

  @ApiProperty()
  latitude: string;

  @ApiProperty()
  longitude: string;

  @ApiHideProperty()
  user: UserEntity;
}
