import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { EntityNotFoundError, QueryFailedError, TypeORMError } from 'typeorm';
import { CreateErrorInterface } from '../../api/history/error/interface/create-error.interface';

@Catch(HttpException, QueryFailedError, EntityNotFoundError, TypeORMError)
export class HttpExceptionFilter implements ExceptionFilter {
  constructor() {}

  async catch(
    exception:
      | HttpException
      | QueryFailedError
      | EntityNotFoundError
      | TypeORMError,
    host: ArgumentsHost,
  ) {
    // Log the exception for debugging purposes
    console.error(exception);

    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    // Determine the HTTP status code
    const status =
      exception instanceof HttpException ? exception.getStatus() : 400;

    const date = Date.now();

    // Create an object to store error history information
    const createErrorHistoryInterface: CreateErrorInterface = {
      error: exception['response'],
      status: status,
      path: request.url,
      method: request.method,
      route: request.route,
    };

    // You can uncomment this section to use an error service to log errors
    // await this.errorService.create(createErrorHistoryInterface);

    // Define error messages and responses based on status code
    const errorResponse: any = {
      400: {
        msg: exception['response'] || exception.message,
        status: 'failed',
      },
      401: { msg: 'Unauthorized', status: 'failed' },
      403: {
        msg: exception.message || exception['response'] || 'Forbidden',
        status: 'failed',
      },
      404: {
        msg: exception['response'] || exception.message || 'Not Found',
        status: 'failed',
      },
      409: { msg: exception, status: 'failed' },
      500: { msg: exception, status: 'failed', body: request.body },
    };

    // Send the appropriate response based on the status code
    response.status(status).json({
      ...errorResponse[status],
      timestamp: date,
    });
  }
}
