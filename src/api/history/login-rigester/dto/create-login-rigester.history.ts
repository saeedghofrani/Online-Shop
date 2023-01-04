import { Prop } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';

export class CreateLoginRigesterHistoryDto {
  @ApiProperty()
  userId: string;

  @Prop({ required: true })
  access_token: string;

  @Prop({ required: true })
  user: string;

  @Prop({ required: true })
  roles: string[];

  @Prop({ required: true })
  otpCode: string;
}
