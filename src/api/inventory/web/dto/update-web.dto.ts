import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { ProviderEntity } from 'src/entities/INVENTORY/provider.entity';
import { WebEntity } from 'src/entities/INVENTORY/web.entity';

export class UpdateWebDto implements Partial<WebEntity> {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  original_name: string;

  @ApiProperty()
  provider_id: ProviderEntity[];

  @ApiHideProperty()
  provider: ProviderEntity;
}
