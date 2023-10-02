import { ApiProperty } from '@nestjs/swagger';
import { ProviderEntity } from 'entities/inventory/provider.entity';

export class UpdateProviderDto implements Partial<ProviderEntity> {
  @ApiProperty()
  address: string;

  @ApiProperty()
  latitude: string;

  @ApiProperty()
  longitude: string;
}
