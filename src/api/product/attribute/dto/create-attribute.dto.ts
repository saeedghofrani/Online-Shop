import { ApiProperty } from '@nestjs/swagger';

export class CreateAttributeDto {
  @ApiProperty()
  name: string;
}
