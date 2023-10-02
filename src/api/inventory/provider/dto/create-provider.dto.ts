import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { UserEntity } from 'src/entities/auth/user.entity';
import { ProviderEntity } from 'src/entities/inventory/provider.entity';

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
