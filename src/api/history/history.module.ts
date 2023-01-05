import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { LoginRigesterHistoryService } from "./login-rigester/service/login-register.service";
import { OtpHistoryService } from "./otp/service/otp.service";
import { OtpHistory, OtpHistorySchema } from "../../entities/history/otp.schema";
import { LoginRegisterHistory, LoginRegisterHistorySchema } from "../../entities/history/login-register.schema";
import { ErrorHistory, ErrorHistorySchema } from "../../entities/history/error.schema";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: OtpHistory.name, schema: OtpHistorySchema },
      { name: LoginRegisterHistory.name, schema: LoginRegisterHistorySchema },
      { name: ErrorHistory.name, schema: ErrorHistorySchema },
    ]),
  ],
  providers: [OtpHistoryService, LoginRigesterHistoryService],
  exports: [OtpHistoryService, LoginRigesterHistoryService],
})
export class HistoryModule {}
