import { ApiHideProperty } from '@nestjs/swagger';

export class CreateOtpHistoryDto {
  @ApiHideProperty()
  user: string;
}
