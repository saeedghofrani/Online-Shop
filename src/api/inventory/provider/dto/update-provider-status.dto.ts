import { ApiProperty } from '@nestjs/swagger';
import { ProviderStatus } from 'src/entities/INVENTORY/enum/provider-status.enum';

export class UpdateProviderStatusDto {
  @ApiProperty()
  status: ProviderStatus;
}
