import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CheckOtpInterface } from 'src/api/auth/user/interface/check-otp.interface';
import { CreateLoginRegisterInterface } from 'src/api/history/login-rigester/interface/create-login-register.interface';
import { LoginRigesterHistoryService } from 'src/api/history/login-rigester/service/login-register.service';

@Injectable()
export class LoginRigesterInterceptor<T>
  implements NestInterceptor<T, CheckOtpInterface>
{
  constructor(
    private loginRigesterHistoryService: LoginRigesterHistoryService,
    private jwtService: JwtService,
  ) {}
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<CheckOtpInterface> {
    const request: any = context.switchToHttp().getRequest();
    return next.handle().pipe(
      tap((data: CheckOtpInterface) => {
        const payload: any = this.jwtService.decode(data.access_token);
        const loginRigesterHistoryService: CreateLoginRegisterInterface = {
          access_token: data.access_token,
          roles: data.roles,
          otpCode: request.body.code,
          user: request.body.mobile || request.body.email,
          userId: payload.userId,
        };
        this.loginRigesterHistoryService.create(loginRigesterHistoryService);
      }),
    );
  }
}
