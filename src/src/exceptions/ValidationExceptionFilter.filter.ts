import { Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { ValidationError } from 'class-validator';

@Catch(HttpException)
export class ValidationExceptionFilter extends BaseExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    if (exception instanceof HttpException && exception.getStatus() === HttpStatus.BAD_REQUEST) {
      const errors = exception.getResponse()['message'] || exception.getResponse();
      if (typeof errors !== 'string' && errors.message && errors.message instanceof Array) {
        const messages = errors.message.map((error: ValidationError) => {
          return {
            field: error.property,
            constraints: error.constraints,
          };
        });
        response.status(HttpStatus.BAD_REQUEST).json({
          statusCode: HttpStatus.BAD_REQUEST,
          timestamp: new Date().toISOString(),
          path: request.url,
          errors: messages,
        });
      } else {
        response.status(HttpStatus.BAD_REQUEST).json({
          statusCode: HttpStatus.BAD_REQUEST,
          timestamp: new Date().toISOString(),
          path: request.url,
          message: errors,
        });
      }
    } else {
      super.catch(exception, host);
    }
  }
}
