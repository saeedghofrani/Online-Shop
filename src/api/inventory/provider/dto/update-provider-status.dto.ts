import { ApiProperty } from '@nestjs/swagger';
import { ProviderStatus } from 'src/entities/INVENTORY/enum/provider-status.enum';
import { ProviderEntity } from 'src/entities/INVENTORY/provider.entity';

export class UpdateProviderStatusDto implements Partial<ProviderEntity> {
  @ApiProperty()
  status: ProviderStatus;
}
