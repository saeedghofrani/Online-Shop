import { ApiProperty } from '@nestjs/swagger';

export class SendEmailDto {
  @ApiProperty()
  otp: string;

  @ApiProperty()
  subject: string;
}
