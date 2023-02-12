import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { SendOtpStatusEnum } from '../enum/send-otp-status.enum';

export class MobileSendOtpDto {
  @IsString()
  @ApiProperty()
  @IsNotEmpty()
  mobile: string;

  @IsString()
  @ApiProperty()
  @IsNotEmpty()
  prefix: string;
}

export class CheckMobileOtpDto {
  @IsString()
  @ApiProperty()
  @IsNotEmpty()
  code: string;

  @IsString()
  @ApiProperty({
    example: '9211953839',
    description: 'please don`t use your country prefix in this field',
  })
  @IsNotEmpty()
  mobile: string;

  @IsString()
  @ApiProperty()
  @IsNotEmpty()
  prefix: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  hash: string;
}
