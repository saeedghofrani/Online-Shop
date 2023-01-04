
import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { EmailSendOtpDto } from 'src/api/auth/user/dto/email-otp.dto';
import { MobileSendOtpDto } from 'src/api/auth/user/dto/mobile-otp.dto';
import { CreateOtpHistoryDto } from 'src/api/history/otp/dto/create.otp-history';
import { OtpHistoryService } from 'src/api/history/otp/service/otp.service';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
    constructor(
        private otpHistoryService: OtpHistoryService
    ) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request: any = context.switchToHttp().getRequest();
    const data = request.body;
    const now = Date.now();
    let createOtpHistoryDto: CreateOtpHistoryDto;
    if (data.hasOwnProperty('mobile')) {
        createOtpHistoryDto.user = data.mobile;
    } else {
        createOtpHistoryDto.user = data.email;
    }
    this.otpHistoryService.create(createOtpHistoryDto);
    return next
      .handle()
      .pipe(
        tap(() =>{}),
      );
  }
}
