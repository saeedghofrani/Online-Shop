import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { ProviderEntity } from 'src/entities/inventory/provider.entity';
import { WebEntity } from 'src/entities/inventory/web.entity';

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
