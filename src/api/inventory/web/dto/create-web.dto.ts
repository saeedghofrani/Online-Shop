import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ProviderEntity } from 'src/entities/inventory/provider.entity';
import { WebEntity } from 'src/entities/inventory/web.entity';

export class CreateWebDto implements Partial<WebEntity> {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  original_name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  provider_id: number;

  @ApiHideProperty()
  provider: ProviderEntity;
}
