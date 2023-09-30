import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { UserEntity } from 'src/entities/AUTH/user.entity';
import { ProviderEntity } from 'src/entities/INVENTORY/provider.entity';

export class CreateProviderDto  implements Partial<ProviderEntity>{
  @ApiProperty()
  address: string;

  @ApiProperty()
  latitude: string;

  @ApiProperty()
  longitude: string;

  @ApiHideProperty()
  user: UserEntity;
}
