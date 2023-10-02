import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LoginRigesterHistoryService } from './login-rigester/service/login-register.service';
import { OtpHistoryService } from './otp/service/otp.service';
import {
  OtpHistory,
  OtpHistorySchema,
} from '../../entities/history/otp.schema';
import {
  LoginRegisterHistory,
  LoginRegisterHistorySchema,
} from '../../entities/history/login-register.schema';
import {
  ErrorHistory,
  ErrorHistorySchema,
} from '../../entities/history/error.schema';
import {
  RequestHistory,
  RequestHistorySchema,
} from 'entities/history/request.schema';
import { RequestHistoryService } from './request/service/request.service';
import {
  ReportOrderHistory,
  ReportOrderHistorySchema,
} from 'entities/history/report-order.schema';
import { ReportOrderHistoryService } from './report-order/service/report-order.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: OtpHistory.name, schema: OtpHistorySchema },
      { name: LoginRegisterHistory.name, schema: LoginRegisterHistorySchema },
      { name: ErrorHistory.name, schema: ErrorHistorySchema },
      { name: RequestHistory.name, schema: RequestHistorySchema },
      { name: ReportOrderHistory.name, schema: ReportOrderHistorySchema },
    ]),
  ],
  providers: [
    OtpHistoryService,
    LoginRigesterHistoryService,
    RequestHistoryService,
    ReportOrderHistoryService,
  ],
  exports: [
    OtpHistoryService,
    LoginRigesterHistoryService,
    RequestHistoryService,
    ReportOrderHistoryService,
  ],
})
export class HistoryModule {}
