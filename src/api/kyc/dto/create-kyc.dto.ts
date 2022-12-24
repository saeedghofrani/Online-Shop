import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';

export class CreateKycDto {
  @ApiHideProperty()
  id: string;

  @ApiProperty()
  father_name: string;

  @ApiProperty()
  national_code: string;

  @ApiProperty()
  birth_date: Date;
}
