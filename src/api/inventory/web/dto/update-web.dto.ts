import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { ProviderEntity } from 'src/entities/INVENTORY/provider.entity';

export class UpdateWebDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  original_name: string;

  @ApiProperty()
  provider_id: ProviderEntity[];

  @ApiHideProperty()
  provider: ProviderEntity;
}