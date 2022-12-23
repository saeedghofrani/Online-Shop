import { Injectable } from '@nestjs/common';

@Injectable()
export class EmailService {
  async sentCode(email: string, otpCode: string): Promise<any> {
    return;
  }
}
