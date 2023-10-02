import { ApiProperty } from '@nestjs/swagger';
import { ProviderEntity } from 'src/entities/inventory/provider.entity';

export class UpdateProviderDto implements Partial<ProviderEntity> {
  @ApiProperty()
  address: string;

  @ApiProperty()
  latitude: string;

  @ApiProperty()
  longitude: string;
}
