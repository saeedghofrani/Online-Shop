import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { StateEntity } from 'src/entities/LOCATION/state.entity';

export class CreateOtpHistoryDto {
  @ApiProperty()
  otp_code: string;

  @ApiProperty()
  token: string;

  @ApiHideProperty()
  user: string;
}
