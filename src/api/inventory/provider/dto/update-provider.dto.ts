import { ApiProperty } from '@nestjs/swagger';

export class UpdateProviderDto {
  @ApiProperty()
  address: string;

  @ApiProperty()
  latitude: string;

  @ApiProperty()
  longitude: string;
}
