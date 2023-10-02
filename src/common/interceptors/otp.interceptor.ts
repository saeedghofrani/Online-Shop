import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CreateOtpInterface } from 'api/history/otp/interface/create-otp.interface';
import { OtpHistoryService } from 'api/history/otp/service/otp.service';

@Injectable()
export class OtpInterceptor implements NestInterceptor {
  constructor(private otpHistoryService: OtpHistoryService) {}
  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const request: any = context.switchToHttp().getRequest();
    const data = request.body;
    const createOtpHistoryDto: CreateOtpInterface = {
      user: data.mobile || data.email,
    };
    await this.otpHistoryService.create(createOtpHistoryDto);
    return next.handle().pipe(tap(() => {}));
  }
}
