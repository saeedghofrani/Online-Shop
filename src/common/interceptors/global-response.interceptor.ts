import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { GlobalResponseClass } from '../classes/global-response.class';
import { Request } from 'express';

export class ResponseOkInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ):
    | Observable<GlobalResponseClass>
    | Promise<Observable<GlobalResponseClass>> {
    const req: Request = context.switchToHttp().getRequest();
    return next
      .handle()
      .pipe(map((data) => new GlobalResponseClass(req, data)));
  }
}
