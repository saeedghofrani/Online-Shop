import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { CreateOtpHistoryDto } from "src/api/history/otp/dto/create.otp-history";
import { OtpHistoryService } from "src/api/history/otp/service/otp.service";

@Injectable()
export class OtpInterceptor implements NestInterceptor {
  constructor(private otpHistoryService: OtpHistoryService) {}
  async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
    const request: any = context.switchToHttp().getRequest();
    const data = request.body;
    const createOtpHistoryDto: CreateOtpHistoryDto = {
      user : data.mobile || data.email
    };
    await this.otpHistoryService.create(createOtpHistoryDto);
    return next.handle().pipe(tap(() => {}));
  }
}
