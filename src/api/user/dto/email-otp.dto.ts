import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { SendOtpStatusEnum } from '../enum/send-otp-status.enum';

export class EmailSendOtpDto {
  @ApiProperty()
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @ApiProperty({
    type: 'enum',
    enum: SendOtpStatusEnum,
    default: SendOtpStatusEnum.LOGIN,
  })
  otp_type: SendOtpStatusEnum;
}

export class CheckEmailOtpDto {
  @ApiProperty()
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  code: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  hash: string;
}
