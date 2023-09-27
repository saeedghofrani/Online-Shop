import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ErrorService } from '../../api/history/error/service/error.service';
import { CreateErrorInterface } from '../../api/history/error/interface/create-error.interface';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(private errorService: ErrorService) {}
  async catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const date = Date.now();
    const createErrorHistoryInterface: CreateErrorInterface = {
      error: exception['response'],
      status: status,
      path: request.url,
      methode: request.method,
      route: request.route,
    };
    await this.errorService.create(createErrorHistoryInterface);
    switch (status) {
      case 400: {
        response.status(status).json({
          msg: exception['response'],
          status: status,
          timestamp: date,
          path: request.url,
          method: request.method,
        });
        break;
      }
      case 401: {
        response.status(status).json({
          status: status,
          timestamp: date,
          path: request.url,
          method: request.method,
        });
        break;
      }
      case 402: {
        response.status(status).json({
          msg: exception,
          status: status,
          timestamp: date,
          path: request.url,
          method: request.method,
        });
        break;
      }
      case 403: {
        response.status(status).json({
          msg: exception['response'],
          status: status,
          timestamp: date,
          path: request.url,
          method: request.method,
        });
        break;
      }
      case 409: {
        response.status(status).json({
          msg: exception,
          status: status,
          timestamp: date,
          path: request.url,
          method: request.method,
        });
        break;
      }
      case 500: {
        response.status(status).json({
          msg: exception,
          status: status,
          timestamp: date,
          path: request.url,
          method: request.method,
          body: request.body,
        });
        break;
      }
    }
  }
}
