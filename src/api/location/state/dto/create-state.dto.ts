import { ApiProperty } from '@nestjs/swagger';

export class CreateStateDto {
  @ApiProperty()
  name: string;
}
