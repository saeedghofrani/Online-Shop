import { ApiProperty } from '@nestjs/swagger';

export class CreateKycDto {
  @ApiProperty()
  father_name: string;

  @ApiProperty()
  national_code: string;

  @ApiProperty()
  birth_date: Date;
}
