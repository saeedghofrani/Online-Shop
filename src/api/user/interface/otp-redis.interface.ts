import { SendOtpStatusEnum } from '../enum/send-otp-status.enum';

export interface OtpRedisInterface {
  otpCode: string;
  user: string;
  type: SendOtpStatusEnum;
}
