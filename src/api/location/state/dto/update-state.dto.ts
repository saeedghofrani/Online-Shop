import { ApiProperty } from '@nestjs/swagger';

export class UpdateStateDto {
  @ApiProperty()
  name: string;
}
