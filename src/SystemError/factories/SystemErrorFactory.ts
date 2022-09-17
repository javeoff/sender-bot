import { Injectable } from '@nestjs/common';
import { ErrorCode } from '../enums/ErrorCode';
import { SystemError } from '../dto/SystemError';

@Injectable()
export class SystemErrorFactory {
  public create(
    errorCode: ErrorCode,
    message = '',
    data: Record<string, unknown> = {},
  ): SystemError {
    const systemError = new SystemError(message);

    systemError.systemCode = errorCode;
    systemError.systemAdditionalData = data;

    return systemError;
  }
}
