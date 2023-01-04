import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LoginRegisterHsitory, LoginRegisterHsitorySchema } from 'src/entities/history/login-register.schema';
import { OtpHistorySchema, OtpHsitory } from 'src/entities/history/otp.schema';
import { LoginRigesterHistoryService } from './login-rigester/service/login-register.service';
import { OtpHistoryService } from './otp/service/otp.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: OtpHsitory.name, schema: OtpHistorySchema },
      { name: LoginRegisterHsitory.name, schema: LoginRegisterHsitorySchema}
    ]),
  ],
  providers: [OtpHistoryService, LoginRigesterHistoryService],
  exports: [OtpHistoryService, LoginRigesterHistoryService],
})
export class HistoryModule {}
