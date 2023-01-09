import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request } from 'express';
import { CreateRequestHistoryInterfece } from 'src/api/history/request/interface/create-request.interface';
import { RequestHistoryService } from 'src/api/history/request/service/request.service';
import { UserAgentClass } from '../classes/user-agent.class';
const UaParser = require('ua-parser-js');

@Injectable()
export class RequestLoggerMiddleware implements NestMiddleware {
  constructor(private requestHistoryService: RequestHistoryService) {}
  async use(
    request: Request,
    response: any,
    next: NextFunction,
  ): Promise<void> {
    const { ip, method, path: url } = request;
    const userAgent = request.get('user-agent') || '';
    const parsedUserAgent: UserAgentClass = UaParser(userAgent);
    const is_authenticated =
      request.user && request.user['userId'] ? true : false;
    let statusCode: number;
    let contentLength: string;
    response.on('close', async () => {
      statusCode = response.statusCode;
      contentLength = response.get('content-length');
      const createRequestHistoryInterfece: CreateRequestHistoryInterfece = {
        contentLength,
        ip,
        method,
        is_authenticated,
        route: url,
        statusCode,
        userAgent: parsedUserAgent,
        data: request.body,
        token: request.headers.authorization,
        query: request.query,
      };
      await this.requestHistoryService.create(createRequestHistoryInterfece);
    });
    next();
  }
}
