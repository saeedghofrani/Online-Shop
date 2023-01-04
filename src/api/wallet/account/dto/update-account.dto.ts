import { ApiProperty } from '@nestjs/swagger';

export class UpdateAccountDto {
  @ApiProperty()
  account: string;

  @ApiProperty()
  iban: string;
}
