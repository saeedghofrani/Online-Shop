import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { OtpHistorySchema, OtpHsitory } from "src/entities/history/otp.schema";
import { OtpHistoryService } from "./otp/service/otp.service";

@Module({
    imports: [
        MongooseModule.forFeature([{ name: OtpHsitory.name, schema: OtpHistorySchema }])
    ],
    providers: [OtpHistoryService],
    exports: [OtpHistoryService]
})
export class HistoryModule { }