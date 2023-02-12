import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { SendOtpStatusEnum } from '../enum/send-otp-status.enum';

export class EmailSendOtpDto {
  @ApiProperty()
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  email: string;
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
