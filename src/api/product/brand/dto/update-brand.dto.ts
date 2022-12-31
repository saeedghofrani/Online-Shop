import { ApiProperty } from '@nestjs/swagger';

export class UpdateBrandDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;
}
