import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { LoginRigesterHistoryService } from "./login-rigester/service/login-register.service";
import { OtpHistoryService } from "./otp/service/otp.service";
import { OtpHistory, OtpHistorySchema } from "../../entities/history/otp.schema";
import { LoginRegisterHistory, LoginRegisterHistorySchema } from "../../entities/history/login-register.schema";
import { ErrorHistory, ErrorHistorySchema } from "../../entities/history/error.schema";
import { RequestHistory, RequestHistorySchema } from "src/entities/history/request.schema";
import { RequestHistoryService } from "./request/service/request.service";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: OtpHistory.name, schema: OtpHistorySchema },
      { name: LoginRegisterHistory.name, schema: LoginRegisterHistorySchema },
      { name: ErrorHistory.name, schema: ErrorHistorySchema },
      { name: RequestHistory.name, schema: RequestHistorySchema },
    ]),
  ],
  providers: [OtpHistoryService, LoginRigesterHistoryService, RequestHistoryService],
  exports: [OtpHistoryService, LoginRigesterHistoryService, RequestHistoryService],
})
export class HistoryModule {}
