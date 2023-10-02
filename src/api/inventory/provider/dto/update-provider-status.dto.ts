import { ApiProperty } from '@nestjs/swagger';
import { ProviderStatus } from 'entities/inventory/enum/provider-status.enum';
import { ProviderEntity } from 'entities/inventory/provider.entity';

export class UpdateProviderStatusDto implements Partial<ProviderEntity> {
  @ApiProperty()
  status: ProviderStatus;
}
