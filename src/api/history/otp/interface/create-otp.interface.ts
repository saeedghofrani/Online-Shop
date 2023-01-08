import { ApiHideProperty } from '@nestjs/swagger';

export class CreateOtpInterface {
  @ApiHideProperty()
  user: string;
}
