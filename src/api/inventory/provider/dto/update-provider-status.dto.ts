import { ApiProperty } from '@nestjs/swagger';
import { ProviderStatus } from 'src/entities/inventory/enum/provider-status.enum';
import { ProviderEntity } from 'src/entities/inventory/provider.entity';

export class UpdateProviderStatusDto implements Partial<ProviderEntity> {
  @ApiProperty()
  status: ProviderStatus;
}
