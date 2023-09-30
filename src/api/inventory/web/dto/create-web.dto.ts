import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { ProviderEntity } from 'src/entities/INVENTORY/provider.entity';
import { WebEntity } from 'src/entities/INVENTORY/web.entity';

export class CreateWebDto implements Partial<WebEntity> {
  @ApiProperty()
  name: string;

  @ApiProperty()
  original_name: string;

  @ApiProperty()
  provider_id: number;

  @ApiHideProperty()
  provider: ProviderEntity;
}
